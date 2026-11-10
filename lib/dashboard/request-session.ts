import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  verifySessionToken,
  type DashboardSession,
} from "@/lib/dashboard/session";

export async function getRequestSession(): Promise<DashboardSession | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
