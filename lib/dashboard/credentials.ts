import { createHmac, timingSafeEqual } from "node:crypto";
import { compare } from "bcryptjs";
import { isSessionSecretConfigured } from "@/lib/dashboard/session";

// Valid bcrypt hash of an unused dummy string so missing-config logins
// still pay the bcrypt cost instead of returning immediately.
const DUMMY_PASSWORD_HASH =
  "$2b$12$zpTLEPuH/BJyxr3pdBcaF.CeAio60SGGM.kOJtmXuUL/H7GUnolrG";

export type AuthConfig = {
  email: string;
  passwordHash: string;
};

export function getAuthConfig(): AuthConfig | null {
  const email = process.env.DASHBOARD_EMAIL?.trim() ?? "";
  const passwordHash = process.env.DASHBOARD_PASSWORD_HASH?.trim() ?? "";
  if (!email || !passwordHash || !isSessionSecretConfigured()) return null;
  return { email, passwordHash };
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function hmacCompare(left: string, right: string, key: string): boolean {
  const leftDigest = createHmac("sha256", key).update(left).digest();
  const rightDigest = createHmac("sha256", key).update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

export async function verifyDashboardCredentials(
  email: string,
  password: string,
): Promise<boolean> {
  const config = getAuthConfig();
  const key = process.env.SESSION_SECRET?.trim() || "missing-session-secret";
  const expectedEmail = config ? normalizeEmail(config.email) : "";
  const hash = config?.passwordHash || DUMMY_PASSWORD_HASH;

  const emailMatch = hmacCompare(normalizeEmail(email), expectedEmail, key);
  let passwordMatch = false;
  try {
    passwordMatch = await compare(password, hash);
  } catch {
    passwordMatch = false;
  }

  return Boolean(config) && emailMatch && passwordMatch;
}
