import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UseCasesExplorer } from "@/components/use-cases-explorer";
import { BreadcrumbJsonLd } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Client work delivered by RWERU Studio — New Jerusalem Church, Eza Hotel, jFountain Mission, and more, plus Masata in production.",
  alternates: { canonical: "/use-cases" },
  openGraph: {
    title: "Work | RweruSynapse",
    description:
      "Client work delivered by RWERU Studio — New Jerusalem Church, Eza Hotel, jFountain Mission, and more, plus Masata in production.",
    url: "/use-cases",
  },
};

export default function UseCasesPage() {
  return (
    <>
      <Header />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Work", href: "/use-cases" }]} />
      <main>
        <UseCasesExplorer />
      </main>
      <Footer />
    </>
  );
}
