import test from "node:test";
import assert from "node:assert/strict";
import { registerHooks } from "node:module";

// Next resolves @/ imports in the app; resolve them for Node's isolated API tests.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/"))
      return nextResolve(
        new URL(`../${specifier.slice(2)}.ts`, import.meta.url).href,
        context,
      );
    if (specifier === "next/server")
      return nextResolve("next/server.js", context);
    return nextResolve(specifier, context);
  },
});
const { POST } = await import("../app/api/playground/lead/route.ts");

function request(body, label) {
  return new Request("https://rweru.com/api/playground/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": label },
    body: JSON.stringify(body),
  });
}
const base = {
  name: "Test <builder>",
  email: "builder@example.com",
  whatsapp: "",
  consent: true,
  source: "product-quiz",
  answers: [0, 1, 0, 0, 0],
  summary: "Untrusted invented result",
};

test("successful lead delivery recomputes the quiz plan and escapes user input", async () => {
  const previousKey = process.env.RESEND_API_KEY;
  const previousFetch = globalThis.fetch;
  let delivery;
  process.env.RESEND_API_KEY = "test-key-never-sent";
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://api.resend.com/emails");
    delivery = JSON.parse(options.body);
    return new Response("{}", { status: 200 });
  };
  try {
    const response = await POST(request(base, "api-success-test"));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.match(delivery.text, /A booking website/);
    assert.ok(!delivery.text.includes("Untrusted invented result"));
    assert.match(delivery.html, /Test &lt;builder&gt;/);
    assert.equal(delivery.reply_to, "builder@example.com");
    assert.match(delivery.text, /no newsletter subscription/);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousKey;
  }
});

test("WhatsApp-only leads are delivered without a fake reply-to address", async () => {
  const previousKey = process.env.RESEND_API_KEY;
  const previousFetch = globalThis.fetch;
  let delivery;
  process.env.RESEND_API_KEY = "test-key-never-sent";
  globalThis.fetch = async (_url, options) => {
    delivery = JSON.parse(options.body);
    return new Response("{}", { status: 200 });
  };
  try {
    const response = await POST(
      request(
        { ...base, email: "", whatsapp: "+250 793 126 602" },
        "api-phone-test",
      ),
    );
    assert.equal(response.status, 200);
    assert.equal(delivery.reply_to, undefined);
    assert.match(delivery.text, /WhatsApp: \+250 793 126 602/);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousKey;
  }
});

test("delivery errors cannot report success or expose provider details", async () => {
  const previousKey = process.env.RESEND_API_KEY;
  const previousFetch = globalThis.fetch;
  process.env.RESEND_API_KEY = "test-key-never-sent";
  globalThis.fetch = async () =>
    new Response("private-provider-detail", { status: 403 });
  try {
    const response = await POST(request(base, "api-failure-test"));
    assert.equal(response.status, 502);
    assert.ok(!(await response.text()).includes("private-provider-detail"));
  } finally {
    globalThis.fetch = previousFetch;
    if (previousKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousKey;
  }
});

test("missing email configuration does not silently log and discard a lead", async () => {
  const previousKey = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    assert.equal(
      (await POST(request(base, "api-unconfigured-test"))).status,
      503,
    );
  } finally {
    if (previousKey !== undefined) process.env.RESEND_API_KEY = previousKey;
  }
});

test("invalid submissions are rejected before any delivery", async () => {
  for (const [index, body] of [
    null,
    { ...base, email: "" },
    { ...base, consent: false },
    { ...base, website: "spam" },
    { ...base, answers: [0, 99, 0, 0, 0] },
    { ...base, source: "invented-tool" },
    { ...base, whatsapp: "0793126602" },
  ].entries()) {
    assert.equal(
      (await POST(request(body, `api-validation-${index}`))).status,
      400,
    );
  }
});
