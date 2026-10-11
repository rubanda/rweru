import { NextResponse } from "next/server";
import {
  checkMobilePerformance,
  inspectWebsite,
  parseWebsiteUrl,
} from "@/lib/website-check";
import { allowRequest } from "@/lib/request-guard";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!allowRequest(request, "website", 3))
    return NextResponse.json(
      { error: "Please wait a minute before checking another website." },
      { status: 429 },
    );
  let url;
  try {
    const body = await request.json();
    url = parseWebsiteUrl(body?.url);
  } catch {
    return NextResponse.json(
      {
        error:
          "Enter a public HTTPS website address, such as https://example.com.",
      },
      { status: 400 },
    );
  }
  const [inspection, performance] = await Promise.allSettled([
    inspectWebsite(url),
    checkMobilePerformance(url),
  ]);
  if (inspection.status === "rejected" && performance.status === "rejected")
    return NextResponse.json(
      {
        error:
          "We could not check this website. It may block automated checks or the checking service may be busy. Try again later.",
      },
      { status: 502 },
    );
  return NextResponse.json({
    url: url.href,
    inspection: inspection.status === "fulfilled" ? inspection.value : null,
    performance: performance.status === "fulfilled" ? performance.value : null,
    notes: [
      inspection.status === "rejected"
        ? "We could not read the page HTML. Mobile viewport and WhatsApp checks are unavailable."
        : null,
      performance.status === "rejected"
        ? "Google’s mobile performance check is unavailable. Try again later or open the full Google report."
        : null,
    ].filter(Boolean),
  });
}
