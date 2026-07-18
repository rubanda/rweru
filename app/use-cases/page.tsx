import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UseCasesExplorer } from "@/components/use-cases-explorer";

export const metadata: Metadata = {
  title: "Use cases",
  description:
    "Websites and applications built by RweruSynapse — Masata, New Jerusalem Church, Eza Hotel, jFountain Mission, and more.",
  alternates: { canonical: "/use-cases" },
  openGraph: {
    title: "Use cases | RweruSynapse",
    description:
      "Websites and applications built by RweruSynapse — Masata, New Jerusalem Church, Eza Hotel, jFountain Mission, and more.",
    url: "/use-cases",
  },
};

export default function UseCasesPage() {
  return (
    <>
      <Header />
      <main>
        <UseCasesExplorer />
      </main>
      <Footer />
    </>
  );
}
