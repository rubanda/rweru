import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MissionBand } from "@/components/mission-band";
import { ProductsShowcase } from "@/components/products-showcase";
import { StudioShowcase } from "@/components/studio-showcase";
import { UseCasesShowcase } from "@/components/use-cases-showcase";
import { ProofStrip } from "@/components/proof-strip";
import { LabsTeaser } from "@/components/labs-teaser";
import { CommunityEventsTeaser } from "@/components/community-events-teaser";
import { LatestReleases } from "@/components/latest-releases";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { PlaygroundTeaser } from "@/components/playground-teaser";
import { ShippingTicker } from "@/components/shipping-ticker";
import { KigaliClock } from "@/components/kigali-clock";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="site-container">
          <div className="flex flex-col gap-3 border-y border-slate/10 py-3 md:flex-row md:items-center md:justify-between">
            <ShippingTicker />
            <KigaliClock />
          </div>
        </div>
        <PlaygroundTeaser />
        <MissionBand />
        <ProductsShowcase />
        <StudioShowcase />
        <UseCasesShowcase />
        <ProofStrip />
        <LabsTeaser />
        <CommunityEventsTeaser />
        <LatestReleases />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
