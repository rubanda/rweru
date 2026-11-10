import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "rweru_dashboard_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const MIN_SECRET_LENGTH = 32;

export type DashboardSession = {
  email: string;
};

function readSecret(): string | null {
  const secret = process.env.SESSION_SECRET?.trim() ?? "";
  if (secret.length < MIN_SECRET_LENGTH) return null;
  return secret;
}

export function isSessionSecretConfigured(): boolean {
  return readSecret() !== null;
}

function secretKey(): Uint8Array | null {
  const secret = readSecret();
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

export function sessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export async function createSessionToken(email: string): Promise<string | null> {
  const key = secretKey();
  if (!key) return null;
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(key);
}

export async function verifySessionToken(
  token: string,
): Promise<DashboardSession | null> {
  const key = secretKey();
  if (!key || !token) return null;
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    const email =
      typeof payload.email === "string"
        ? payload.email
        : typeof payload.sub === "string"
          ? payload.sub
          : "";
    if (!email) return null;
    return { email };
  } catch {
    return null;
  }
}

export function safeDashboardPath(candidate: unknown): string {
  if (typeof candidate !== "string") return "/dashboard";
  if (!candidate.startsWith("/dashboard")) return "/dashboard";
  if (candidate.startsWith("//") || candidate.includes("://")) {
    return "/dashboard";
  }
  if (candidate.includes("\\") || candidate.includes("\n")) {
    return "/dashboard";
  }
  return candidate;
}
