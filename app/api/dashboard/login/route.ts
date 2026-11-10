import { NextResponse } from "next/server";
import { allowRequest } from "@/lib/request-guard";
import { getAuthConfig, verifyDashboardCredentials } from "@/lib/dashboard/credentials";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  safeDashboardPath,
  sessionCookieOptions,
} from "@/lib/dashboard/session";

export const runtime = "nodejs";

const GENERIC_ERROR = "Invalid email or password.";
const FAIL_DELAY_MS = 400;

type LoginBody = {
  email?: unknown;
  password?: unknown;
  next?: unknown;
};

async function delayedJson(body: unknown, status: number) {
  await new Promise((resolve) => setTimeout(resolve, FAIL_DELAY_MS));
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  if (!allowRequest(request, "dashboard-login", 5)) {
    return delayedJson(
      {
        ok: false,
        error: "Too many sign-in attempts. Try again in a minute.",
      },
      429,
    );
  }

  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return delayedJson({ ok: false, error: GENERIC_ERROR }, 400);
  }

  const email = typeof body.email === "string" ? body.email : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!getAuthConfig()) {
    console.error(
      "[dashboard-login] Auth is not configured. Set DASHBOARD_EMAIL, DASHBOARD_PASSWORD_HASH, and SESSION_SECRET.",
    );
  }

  const ok = await verifyDashboardCredentials(email, password);
  if (!ok) {
    return delayedJson({ ok: false, error: GENERIC_ERROR }, 401);
  }

  const token = await createSessionToken(email.trim().toLowerCase());
  if (!token) {
    console.error("[dashboard-login] Could not sign a session token.");
    return delayedJson({ ok: false, error: GENERIC_ERROR }, 500);
  }

  const redirectTo = safeDashboardPath(body.next);
  const response = NextResponse.json({ ok: true, redirect: redirectTo });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions(SESSION_MAX_AGE_SECONDS));
  return response;
}
