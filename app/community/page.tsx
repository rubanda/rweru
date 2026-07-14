import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CommunityEventsExplorer } from "@/components/community-events-explorer";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Workshops, ship nights, and learning paths for youth and builders across Rwanda and Africa — from RweruSynapse.",
};

export default function CommunityPage() {
  return (
    <>
      <Header />
      <main>
        <CommunityEventsExplorer />
      </main>
      <Footer />
    </>
  );
}
