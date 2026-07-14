import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MissionBand } from "@/components/mission-band";
import { UseCasesShowcase } from "@/components/use-cases-showcase";
import { CommunityEventsTeaser } from "@/components/community-events-teaser";
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
        <CommunityEventsTeaser />
        <UseCasesShowcase />
        <LatestReleases />
        <FeaturedList />
      </main>
      <Footer />
    </>
  );
}
