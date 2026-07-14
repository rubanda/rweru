import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MissionBand } from "@/components/mission-band";
import { UseCasesShowcase } from "@/components/use-cases-showcase";
import { LatestReleases } from "@/components/latest-releases";
import { FeaturedList } from "@/components/featured-list";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MissionBand />
        <UseCasesShowcase />
        <LatestReleases />
        <FeaturedList />
      </main>
      <Footer />
    </>
  );
}
