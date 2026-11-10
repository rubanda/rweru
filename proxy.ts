import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  verifySessionToken,
} from "@/lib/dashboard/session";

function withPrivateHeaders(response: NextResponse) {
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value ?? "";
  const session = token ? await verifySessionToken(token) : null;

  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      const login = request.nextUrl.clone();
      login.pathname = "/login";
      login.search = "";
      login.searchParams.set("next", pathname);
      return withPrivateHeaders(NextResponse.redirect(login));
    }
    return withPrivateHeaders(NextResponse.next());
  }

  if (pathname === "/login" && session) {
    const dashboard = request.nextUrl.clone();
    dashboard.pathname = "/dashboard";
    dashboard.search = "";
    return withPrivateHeaders(NextResponse.redirect(dashboard));
  }

  if (pathname === "/login") {
    return withPrivateHeaders(NextResponse.next());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
