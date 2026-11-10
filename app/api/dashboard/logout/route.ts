import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/dashboard/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const login = new URL("/login", request.url);
  const response = NextResponse.redirect(login, 303);
  response.cookies.set(SESSION_COOKIE, "", sessionCookieOptions(0));
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
