import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HomeWhatsappStrip } from "@/components/home-whatsapp-strip";
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
import { AiHelps } from "@/components/ai-helps";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HomeWhatsappStrip />
        <PlaygroundTeaser />
        <AiHelps />
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
