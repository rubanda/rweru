import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbJsonLd } from "@/components/structured-data";
import {
  getPlaygroundTool,
  playgroundCategories,
  playgroundTools,
  type PlaygroundToolSlug,
} from "@/lib/playground-tools";

const toolLoaders: Record<PlaygroundToolSlug, () => Promise<ReactNode>> = {
  "product-quiz": async () => {
    const { ProductQuiz } =
      await import("@/components/playground/product-quiz");
    return <ProductQuiz />;
  },
  "website-check": async () => {
    const { WebsiteCheck } =
      await import("@/components/playground/website-check");
    return <WebsiteCheck />;
  },
  estimator: async () => {
    const { ProjectEstimator } =
      await import("@/components/playground/project-estimator");
    return <ProjectEstimator />;
  },
  "app-builder": async () => {
    const { AppBuilder } = await import("@/components/playground/app-builder");
    return <AppBuilder />;
  },
  bingo: async () => {
    const { BusinessBingo } =
      await import("@/components/playground/business-bingo");
    return <BusinessBingo />;
  },
  "ship-night": async () => {
    const { ShipNight } = await import("@/components/playground/ship-night");
    return <ShipNight />;
  },
  "tech-quiz": async () => {
    const { TechQuiz } = await import("@/components/playground/tech-quiz");
    return <TechQuiz />;
  },
  "masata-demo": async () => {
    const { MasataDemo } = await import("@/components/playground/masata-demo");
    return <MasataDemo />;
  },
};

export function generateStaticParams() {
  return playgroundTools.map((tool) => ({ tool: tool.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = getPlaygroundTool(slug);
  if (!tool) notFound();
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: `/playground/${tool.slug}` },
    openGraph: {
      title: `${tool.title} | RWERU Playground`,
      description: tool.description,
      url: `/playground/${tool.slug}`,
    },
  };
}

export default async function PlaygroundToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool: slug } = await params;
  const tool = getPlaygroundTool(slug);
  if (!tool) notFound();
  const category = playgroundCategories.find(
    (item) => item.id === tool.category,
  )!;
  const galleryHref =
    tool.category === "business"
      ? "/playground"
      : `/playground?category=${tool.category}`;
  const experience = await toolLoaders[tool.slug]();
  return (
    <>
      <Header />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Playground", href: "/playground" },
          { name: tool.title, href: `/playground/${tool.slug}` },
        ]}
      />
      <main className="site-container pb-16 pt-7 md:pb-24 md:pt-10">
        <div
          className={`mx-auto ${tool.slug === "product-quiz" ? "max-w-5xl" : "max-w-3xl"}`}
        >
          <Link
            href={galleryHref}
            className="inline-flex items-center gap-2 text-sm text-slate-medium"
          >
            <ArrowLeft size={16} aria-hidden />
            Back to playground
          </Link>
          <div className="mb-7 mt-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-meta mb-2 text-clay">{category.label}</p>
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {tool.title}
              </h1>
            </div>
            <span className="inline-flex items-center gap-2 text-xs text-slate-medium">
              <Clock3 size={14} aria-hidden />
              {tool.duration}
            </span>
          </div>
          {experience}
          <p className="mt-7 text-center text-xs text-slate-medium">
            Finished exploring?{" "}
            <Link
              href={galleryHref}
              className="text-clay underline underline-offset-4"
            >
              Choose another card
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
