import test from "node:test";
import assert from "node:assert/strict";
import {
  buildProductPlan,
  validAnswers,
  estimateProject,
  estimatorConfig,
  contactHref,
  planText,
} from "../lib/playground.ts";
import {
  isPublicAddress,
  parseWebsiteUrl,
  inspectWebsite,
} from "../lib/website-check.ts";
import { allowRequest } from "../lib/request-guard.ts";

test("quiz rejects missing, non-integer, and out-of-range answers", () => {
  for (const answers of [
    null,
    [],
    [0, 0, 0, 0],
    [0, 5, 0, 0, 0],
    [0, -1, 0, 0, 0],
    [0, 1.5, 0, 0, 0],
    ["0", 0, 0, 0, 0],
  ]) {
    assert.equal(validAnswers(answers), false);
    assert.throws(() => buildProductPlan(answers));
  }
});

test("customer actions lead to distinct useful starter plans", () => {
  const titles = [
    "A website that brings in enquiries",
    "A booking website",
    "An online shop",
    "A member portal",
    "A focused marketplace",
  ];
  titles.forEach((title, action) => {
    const plan = buildProductPlan([0, action, 0, 0, 0]);
    assert.equal(plan.title, title);
    assert.equal(plan.features.length, 4);
    assert.equal(plan.answers.length, 5);
    assert.ok(planText(plan).includes(title));
  });
});

test("multi-branch admin work adds scope and exploration changes the next step", () => {
  const plan = buildProductPlan([3, 3, 4, 3, 3]);
  assert.ok(plan.features.includes("Branch access and permissions"));
  assert.ok(plan.features.includes("One automated admin workflow"));
  assert.match(plan.firstStep, /five potential users/);
});

test("timeline increases with scope and no unapproved price is shown", () => {
  const small = estimateProject(1, 0, false);
  const large = estimateProject(25, 6, true);
  assert.ok(large.minWeeks > small.minWeeks);
  assert.ok(large.maxWeeks >= large.minWeeks);
  assert.equal(small.price, null);
  assert.ok(
    estimateProject(5, 2, true).minWeeks >
      estimateProject(5, 2, false).minWeeks,
  );
});

test("owner-configured pricing calculates a range when enabled", () => {
  estimatorConfig.pricing = {
    currency: "RWF",
    base: 100,
    perPage: 20,
    perFeature: 30,
    mobile: 50,
    uncertainty: 1.5,
  };
  try {
    assert.deepEqual(estimateProject(2, 1, true).price, {
      currency: "RWF",
      min: 220,
      max: 330,
    });
  } finally {
    estimatorConfig.pricing = null;
  }
});

test("WhatsApp links preserve the configured number and encode the result", () => {
  const prior = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  try {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = "+250793126602";
    const url = new URL(contactHref("Bookings & payments\nMy plan"));
    assert.equal(url.pathname, "/250793126602");
    assert.equal(url.searchParams.get("text"), "Bookings & payments\nMy plan");
  } finally {
    if (prior === undefined) delete process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    else process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = prior;
  }
});

test("website URL validation accepts domains and rejects credentials, IPs, and unusual ports", () => {
  assert.equal(
    parseWebsiteUrl("example.com/path#section").href,
    "https://example.com/path",
  );
  for (const url of [
    null,
    "http://example.com",
    "https://localhost",
    "https://127.0.0.1",
    "https://[::1]",
    "https://user:password@example.com",
    "https://example.com:3000",
    "file:///etc/passwd",
    "https://2130706433",
  ])
    assert.throws(() => parseWebsiteUrl(url));
});

test("website checks block private, reserved, mapped IPv6, and transition addresses", () => {
  for (const address of [
    "127.0.0.1",
    "10.0.0.1",
    "172.16.0.1",
    "192.168.1.1",
    "169.254.169.254",
    "0.0.0.0",
    "100.64.0.1",
    "198.18.0.1",
    "192.0.2.1",
    "203.0.113.1",
    "224.0.0.1",
    "::1",
    "::ffff:127.0.0.1",
    "fc00::1",
    "fe80::1",
    "2001:db8::1",
    "2002:7f00:1::1",
    "3fff::1",
  ])
    assert.equal(isPublicAddress(address), false, address);
  assert.equal(isPublicAddress("93.184.216.34"), true);
  assert.equal(isPublicAddress("2606:4700:4700::1111"), true);
});

test("DNS resolving to loopback is rejected before fetching", async () => {
  await assert.rejects(
    inspectWebsite(new URL("https://localhost.")),
    /not a public website/,
  );
});

test("lead and website request limits have separate buckets", () => {
  const request = new Request("https://rweru.com/api", {
    headers: { "x-forwarded-for": "test-client" },
  });
  assert.equal(allowRequest(request, "test-lead", 2), true);
  assert.equal(allowRequest(request, "test-lead", 2), true);
  assert.equal(allowRequest(request, "test-lead", 2), false);
  assert.equal(allowRequest(request, "test-website", 1), true);
  assert.equal(allowRequest(request, "test-website", 1), false);
});
