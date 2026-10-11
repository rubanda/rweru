import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GalleryCard } from "@/components/playground/gallery-card";
import { BreadcrumbJsonLd } from "@/components/structured-data";
import { playgroundCategories, playgroundTools } from "@/lib/playground-tools";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Pick a quick tool or game from the Rweru Playground. Find your next build, explore your idea, or try a little challenge. One experience at a time.",
  alternates: { canonical: "/playground" },
  openGraph: {
    title: "A little play. A real starting point. | RWERU",
    description:
      "Pick your starting point. Explore one idea at a time with Rweru.",
    url: "/playground",
  },
};

export default async function PlaygroundPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: requestedCategory } = await searchParams;
  const category =
    playgroundCategories.find((item) => item.id === requestedCategory) ??
    playgroundCategories[0];
  const tools = playgroundTools.filter((tool) => tool.category === category.id);
  const featured = tools.find((tool) => tool.featured);
  const cards = tools.filter((tool) => !tool.featured);
  return (
    <>
      <Header />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Playground", href: "/playground" },
        ]}
      />
      <main className="site-container pb-16 md:pb-24">
        <section className="pb-8 pt-12 md:pb-10 md:pt-16">
          <p className="text-meta mb-4 text-clay">RWERU Playground</p>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h1 className="text-display-xl font-semibold">
              Pick a little possibility.
            </h1>
            <p className="max-w-sm font-serif text-lg leading-relaxed text-slate-medium">
              Choose a card. Make it your own.
              <br />
              See where one small idea takes you.
            </p>
          </div>
        </section>
        <nav
          aria-label="Playground categories"
          className="mb-8 flex w-fit max-w-full flex-wrap gap-1 rounded-2xl border border-slate/10 bg-ivory p-1.5"
        >
          {playgroundCategories.map((item) => (
            <Link
              key={item.id}
              href={
                item.id === "business"
                  ? "/playground"
                  : `/playground?category=${item.id}`
              }
              scroll={false}
              aria-current={item.id === category.id ? "page" : undefined}
              aria-label={item.label}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${item.id === category.id ? "bg-slate text-ivory" : "text-slate-medium hover:bg-slate/5"}`}
            >
              <span className="sm:hidden">
                {item.id === "business"
                  ? "Business"
                  : item.id === "play"
                    ? "Play"
                    : "Demo"}
              </span>
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </nav>
        <section aria-label={category.label}>
          <p className="mb-6 text-sm text-slate-medium">
            {category.description}
          </p>
          {featured && (
            <div className="mb-6">
              <GalleryCard tool={featured} />
            </div>
          )}
          <div
            className={`grid gap-5 ${category.id === "demo" ? "max-w-md" : "md:grid-cols-3"}`}
          >
            {cards.map((tool) => (
              <GalleryCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-slate/10 pt-6 text-xs text-slate-medium sm:flex-row sm:items-center">
          <p>Have a project in mind already?</p>
          <Link
            href="/contact"
            className="w-fit text-sm font-medium text-clay link-underline"
          >
            Let’s talk about it ↗
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
