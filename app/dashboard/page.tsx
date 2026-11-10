import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { dashboardData } from "@/lib/dashboard/items";
import { getRequestSession } from "@/lib/dashboard/request-session";
import { DashboardView } from "./dashboard-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Documents",
  description: "Private RweruSynapse compliance documents dashboard.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default async function DashboardPage() {
  const session = await getRequestSession();
  if (!session) redirect("/login");

  return <DashboardView data={dashboardData} email={session.email} />;
}
