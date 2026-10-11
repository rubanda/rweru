import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { get } from "node:https";

export function isPublicAddress(address: string) {
  if (isIP(address) === 4) {
    const [a, b] = address.split(".").map(Number);
    return !(
      a === 0 ||
      a === 10 ||
      a === 127 ||
      a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && [0, 168].includes(b)) ||
      (a === 198 && [18, 19, 51].includes(b)) ||
      (a === 203 && b === 0)
    );
  }
  // Only global-unicast IPv6, excluding documentation, transition and special ranges.
  return (
    isIP(address) === 6 &&
    /^[23][0-9a-f]{3}:/i.test(address) &&
    !/^(2001:|2002:|3fff:)/i.test(address)
  );
}

export function parseWebsiteUrl(value: unknown) {
  if (typeof value !== "string" || value.length > 2048)
    throw new Error("Enter a public HTTPS website address.");
  const url = new URL(value.includes("://") ? value : `https://${value}`);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    (url.port && url.port !== "443") ||
    !url.hostname.includes(".") ||
    isIP(url.hostname.replace(/[\[\]]/g, ""))
  )
    throw new Error(
      "Use a public website domain with HTTPS, such as https://example.com.",
    );
  url.hash = "";
  return url;
}

async function publicHost(url: URL) {
  const addresses = await lookup(url.hostname, { all: true });
  if (
    !addresses.length ||
    addresses.some((entry) => !isPublicAddress(entry.address))
  )
    throw new Error("This address is not a public website.");
  return addresses.find((entry) => entry.family === 4) ?? addresses[0];
}

export async function inspectWebsite(
  url: URL,
  redirects = 0,
): Promise<{ url: string; mobileViewport: boolean; whatsapp: boolean }> {
  const pinned = await publicHost(url);
  const response = await new Promise<{ html?: string; redirect?: string }>(
    (resolve, reject) => {
      const request = get(
        url,
        {
          family: pinned.family,
          lookup: (_hostname, _options, callback) =>
            callback(null, pinned.address, pinned.family),
          headers: {
            "User-Agent": "RweruWebsiteCheck/1.0",
            Accept: "text/html",
            "Accept-Encoding": "identity",
          },
          signal: AbortSignal.timeout(10_000),
        },
        (res) => {
          if (
            res.statusCode &&
            [301, 302, 303, 307, 308].includes(res.statusCode)
          ) {
            res.resume();
            resolve({ redirect: res.headers.location });
            return;
          }
          if (
            !res.statusCode ||
            res.statusCode >= 400 ||
            !res.headers["content-type"]?.includes("text/html")
          ) {
            res.resume();
            reject(new Error("The website did not return a readable page."));
            return;
          }
          const chunks: Buffer[] = [];
          let size = 0;
          res.on("data", (chunk: Buffer) => {
            size += chunk.length;
            if (size > 1_000_000) {
              request.destroy(
                new Error("This page is too large for a quick check."),
              );
              return;
            }
            chunks.push(chunk);
          });
          res.on("end", () =>
            resolve({ html: Buffer.concat(chunks).toString("utf8") }),
          );
          res.on("error", reject);
        },
      );
      request.on("error", reject);
    },
  );
  if (response.redirect) {
    if (redirects >= 3)
      throw new Error("The website redirected too many times.");
    const next = parseWebsiteUrl(new URL(response.redirect, url).href);
    return inspectWebsite(next, redirects + 1);
  }
  if (!response.html)
    throw new Error("The website did not return a readable page.");
  const metaTags = response.html.match(/<meta\b[^>]*>/gi) ?? [];
  return {
    url: url.href,
    mobileViewport: metaTags.some(
      (tag) =>
        /name\s*=\s*["']?viewport\b/i.test(tag) &&
        /width\s*=\s*device-width/i.test(tag),
    ),
    whatsapp:
      /href\s*=\s*["'][^"']*(?:wa\.me\/|(?:api\.|web\.)?whatsapp\.com\/send)/i.test(
        response.html,
      ),
  };
}

export async function checkMobilePerformance(url: URL) {
  // Validate DNS before passing a target to the external performance service, too.
  await publicHost(url);
  const endpoint = new URL(
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
  );
  endpoint.searchParams.set("url", url.href);
  endpoint.searchParams.set("strategy", "mobile");
  endpoint.searchParams.set("category", "performance");
  if (process.env.PAGESPEED_API_KEY)
    endpoint.searchParams.set("key", process.env.PAGESPEED_API_KEY);
  const response = await fetch(endpoint, {
    signal: AbortSignal.timeout(50_000),
  });
  if (!response.ok)
    throw new Error(
      "Mobile performance is unavailable right now. Try again later or open the full Google report.",
    );
  const data = await response.json();
  const lighthouse = data.lighthouseResult;
  if (
    !lighthouse ||
    lighthouse.runtimeError ||
    typeof lighthouse.categories?.performance?.score !== "number"
  )
    throw new Error("Google could not measure this page.");
  return {
    score: Math.round(lighthouse.categories.performance.score * 100),
    lcp: lighthouse.audits?.["largest-contentful-paint"]?.displayValue ?? null,
    speedIndex: lighthouse.audits?.["speed-index"]?.displayValue ?? null,
  };
}
