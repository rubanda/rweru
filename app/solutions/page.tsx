import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Custom software, platforms, and digital products from RweruSynapse for organizations across Rwanda and Africa.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Solutions | RweruSynapse",
    description:
      "Custom software, platforms, and digital products from RweruSynapse for organizations across Rwanda and Africa.",
    url: "/solutions",
  },
};

const offerings = [
  {
    title: "Custom software",
    body: "Web and mobile products engineered for reliability — from MVP to production scale.",
  },
  {
    title: "Platforms & SaaS",
    body: "Multi-tenant systems for operations, content, community, and internal tools.",
  },
  {
    title: "Product design",
    body: "Research-led UX that respects local workflows, languages, and device realities.",
  },
  {
    title: "Engineering partnership",
    body: "Embedded teams that ship with your organization — architecture, delivery, and mentorship.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="site-container section-y">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-meta mb-6">Solutions</p>
              <h1 className="text-display-xl font-sans font-bold text-slate">
                Software solutions for Rwanda and Africa.
              </h1>
            </div>
            <div className="flex items-end lg:col-span-5">
              <p className="max-w-[40ch] font-serif text-body-lg text-slate-medium">
                We partner with startups, enterprises, and institutions to design and
                ship products that work where your users are — starting in Kigali,
                serving the continent.
              </p>
            </div>
          </div>
        </section>

        <section id="products" className="border-t border-slate/10 bg-ivory">
          <div className="site-container section-y">
            <div className="grid gap-6 md:grid-cols-2">
              {offerings.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl bg-oat p-8 md:p-10"
                >
                  <h2 className="font-sans text-xl font-semibold text-slate">
                    {item.title}
                  </h2>
                  <p className="mt-4 max-w-[36ch] font-serif text-base leading-relaxed text-slate-medium">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="platforms" className="site-container section-y">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="text-display-s font-sans font-semibold">
                See what we&apos;ve shipped
              </h2>
              <p className="mt-4 max-w-[36ch] font-serif text-base leading-relaxed text-slate-medium">
                From non-profits to SaaS platforms — a selection of products built with
                African organizations.
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-7">
              <Link
                href="/use-cases"
                className="group flex items-center justify-between border-b border-slate/10 py-5"
              >
                <span className="font-sans text-lg font-medium group-hover:text-clay">
                  Browse use cases
                </span>
                <span aria-hidden className="text-slate-light transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/contact"
                className="group flex items-center justify-between border-b border-slate/10 py-5"
              >
                <span className="font-sans text-lg font-medium group-hover:text-clay">
                  Start a project
                </span>
                <span aria-hidden className="text-slate-light transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
