import test from "node:test";
import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { hash } from "bcryptjs";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "server-only") {
      return {
        shortCircuit: true,
        url: new URL("./server-only-stub.mjs", import.meta.url).href,
      };
    }
    if (specifier.startsWith("@/")) {
      return nextResolve(
        new URL(`../${specifier.slice(2)}.ts`, import.meta.url).href,
        context,
      );
    }
    if (specifier === "next/server") {
      return nextResolve("next/server.js", context);
    }
    if (specifier === "next/headers") {
      return nextResolve("next/headers.js", context);
    }
    return nextResolve(specifier, context);
  },
});

const { dashboardData } = await import("../lib/dashboard/items.ts");
const {
  SESSION_COOKIE,
  createSessionToken,
  safeDashboardPath,
  verifySessionToken,
} = await import("../lib/dashboard/session.ts");
const { verifyDashboardCredentials } = await import(
  "../lib/dashboard/credentials.ts"
);
const { POST: login } = await import("../app/api/dashboard/login/route.ts");
const { POST: logout } = await import("../app/api/dashboard/logout/route.ts");
const robots = (await import("../app/robots.ts")).default;
const sitemap = (await import("../app/sitemap.ts")).default;

const EXPECTED_IDS = [
  "rdb",
  "etax",
  "ebm",
  "ncsa",
  "abroad",
  "privacy",
  "rura",
  "bank",
  "momo",
  "contract",
  "accountant",
  "registers",
  "patente",
  "cit",
  "accounts",
  "annualreturn",
  "auditor",
  "tcc",
  "vat",
  "rssb",
  "labour",
  "psp",
];

const FIELDS = [
  "id",
  "name",
  "group",
  "status",
  "deadline",
  "cost",
  "route",
  "where",
  "what",
  "docs",
  "steps",
  "time",
  "contact",
];

const previous = {
  email: process.env.DASHBOARD_EMAIL,
  hash: process.env.DASHBOARD_PASSWORD_HASH,
  secret: process.env.SESSION_SECRET,
};

function restoreEnv() {
  writeEnv("DASHBOARD_EMAIL", previous.email);
  writeEnv("DASHBOARD_PASSWORD_HASH", previous.hash);
  writeEnv("SESSION_SECRET", previous.secret);
}

function writeEnv(name, value) {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

async function withAuthEnv(run) {
  const password = "correct-horse-battery";
  writeEnv("DASHBOARD_EMAIL", "momo@rweru.com");
  writeEnv("DASHBOARD_PASSWORD_HASH", await hash(password, 4));
  writeEnv("SESSION_SECRET", "test-session-secret-must-be-32chars-min");
  try {
    return await run(password);
  } finally {
    restoreEnv();
  }
}

function loginRequest(body, ip) {
  return new Request("https://rweru.com/api/dashboard/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

test("dashboard data includes every source item and field", () => {
  assert.deepEqual(
    dashboardData.items.map((item) => item.id),
    EXPECTED_IDS,
  );
  assert.equal(dashboardData.items.filter((item) => item.group === "have").length, 1);
  assert.equal(dashboardData.items.filter((item) => item.group === "now").length, 12);
  assert.equal(dashboardData.items.filter((item) => item.group === "later").length, 5);
  assert.equal(dashboardData.items.filter((item) => item.group === "if").length, 4);
  for (const item of dashboardData.items) {
    for (const field of FIELDS) {
      assert.ok(item[field] != null && item[field] !== "", `${item.id}.${field}`);
    }
    assert.ok(item.docs.length > 0, `${item.id}.docs`);
    assert.ok(item.steps.length > 0, `${item.id}.steps`);
    assert.ok(item.steps[0].title, `${item.id}.steps[0].title`);
  }
  assert.equal(dashboardData.sources.length, 8);
  assert.equal(dashboardData.portals.length, 7);
  assert.match(dashboardData.noteLead, /not legal or tax advice/i);
});

test("signed session tokens verify and reject tampering", async () => {
  await withAuthEnv(async () => {
    const token = await createSessionToken("momo@rweru.com");
    assert.ok(token);
    const session = await verifySessionToken(token);
    assert.deepEqual(session, { email: "momo@rweru.com" });
    assert.equal(await verifySessionToken(`${token}x`), null);
    assert.equal(await verifySessionToken(""), null);
  });
});

test("credentials use constant-time email compare and fail closed", async () => {
  writeEnv("DASHBOARD_EMAIL", "");
  writeEnv("DASHBOARD_PASSWORD_HASH", "");
  writeEnv("SESSION_SECRET", "");
  assert.equal(
    await verifyDashboardCredentials("momo@rweru.com", "correct-horse-battery"),
    false,
  );

  await withAuthEnv(async (password) => {
    assert.equal(
      await verifyDashboardCredentials("momo@rweru.com", password),
      true,
    );
    assert.equal(
      await verifyDashboardCredentials("MOMO@RWERU.COM", password),
      true,
    );
    assert.equal(
      await verifyDashboardCredentials("other@rweru.com", password),
      false,
    );
    assert.equal(
      await verifyDashboardCredentials("momo@rweru.com", "wrong-password"),
      false,
    );
  });
});

test("login sets an httpOnly session cookie and rejects a bad next path", async () => {
  await withAuthEnv(async (password) => {
    const response = await login(
      loginRequest(
        {
          email: "momo@rweru.com",
          password,
          next: "https://evil.example/phish",
        },
        "login-success-ip",
      ),
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.deepEqual(body, { ok: true, redirect: "/dashboard" });
    const cookie = response.cookies.get(SESSION_COOKIE);
    assert.ok(cookie?.value);
    assert.equal(cookie.httpOnly, true);
    assert.equal(cookie.sameSite, "lax");
    assert.equal(cookie.path, "/");
    assert.ok((cookie.maxAge ?? 0) > 0);
  });
});

test("login rejects the wrong password", async () => {
  await withAuthEnv(async () => {
    const response = await login(
      loginRequest(
        { email: "momo@rweru.com", password: "nope" },
        "login-fail-ip",
      ),
    );
    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), {
      ok: false,
      error: "Invalid email or password.",
    });
    assert.equal(response.cookies.get(SESSION_COOKIE), undefined);
  });
});

test("login is rate limited", async () => {
  await withAuthEnv(async () => {
    let last;
    for (let i = 0; i < 6; i += 1) {
      last = await login(
        loginRequest(
          { email: "momo@rweru.com", password: "nope" },
          "login-limit-ip",
        ),
      );
    }
    assert.equal(last.status, 429);
  });
});

test("logout clears the session cookie", async () => {
  const response = await logout(
    new Request("https://rweru.com/api/dashboard/logout", { method: "POST" }),
  );
  assert.equal(response.status, 303);
  assert.equal(new URL(response.headers.get("location")).pathname, "/login");
  const cookie = response.cookies.get(SESSION_COOKIE);
  assert.equal(cookie?.value, "");
  assert.equal(cookie?.maxAge, 0);
});

test("safe dashboard paths reject open redirects", () => {
  assert.equal(safeDashboardPath("/dashboard"), "/dashboard");
  assert.equal(safeDashboardPath("/dashboard?item=etax"), "/dashboard?item=etax");
  assert.equal(safeDashboardPath("https://evil.com"), "/dashboard");
  assert.equal(safeDashboardPath("//evil.com"), "/dashboard");
  assert.equal(safeDashboardPath("/login"), "/dashboard");
});

test("robots and sitemap keep the dashboard private", () => {
  const file = robots();
  for (const rule of file.rules) {
    assert.ok(rule.disallow.includes("/dashboard"));
    assert.ok(rule.disallow.includes("/login"));
    assert.ok(rule.disallow.includes("/api/dashboard"));
  }
  const urls = sitemap().map((entry) => entry.url);
  assert.equal(urls.some((url) => url.includes("/dashboard")), false);
  assert.equal(urls.some((url) => url.includes("/login")), false);
});
