import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { labsFocusAreas } from "@/lib/research";
import { BreadcrumbJsonLd } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Research",
  description:
    "RWERU Labs — RweruSynapse's applied research on software systems, digital infrastructure, and AI for African contexts.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research | RweruSynapse",
    description:
      "RWERU Labs — RweruSynapse's applied research on software systems, digital infrastructure, and AI for African contexts.",
    url: "/research",
  },
};

const publications = [
  {
    date: "Jun 2026",
    category: "Essay",
    title: "Software that fits African realities",
    href: "/blog/shipping-software-in-africa",
  },
  {
    date: "May 2026",
    category: "Brief",
    title: "Connectivity-aware product design",
    href: "/blog/connectivity-aware-design",
  },
  {
    date: "Apr 2026",
    category: "Notes",
    title: "Building for multilingual African audiences",
    href: "/blog/multilingual-african-products",
  },
];

export default function ResearchPage() {
  return (
    <>
      <Header />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Research", href: "/research" }]} />
      <main>
        <section className="site-container section-y">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-meta mb-6">RWERU Labs</p>
              <h1 className="text-display-xl font-sans font-bold text-slate">
                Understanding the systems Africa needs to build.
              </h1>
            </div>
            <div className="flex items-end lg:col-span-5">
              <p className="max-w-[40ch] font-serif text-body-lg text-slate-medium">
                RWERU Labs is where we study how software — and increasingly AI — is
                designed, adopted, and sustained across Rwanda and Africa, then turn
                those insights into products, teaching, and open notes.
              </p>
            </div>
          </div>
        </section>

        <section id="focus" className="border-t border-slate/10 bg-ivory">
          <div className="site-container section-y">
            <h2 className="text-display-s font-sans font-semibold">Focus areas</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {labsFocusAreas.map((area) => (
                <div key={area.title} className="border-t border-slate/10 pt-6">
                  <h3 className="font-sans text-xl font-semibold text-slate">
                    {area.title}
                  </h3>
                  <p className="mt-3 max-w-[40ch] font-serif text-base leading-relaxed text-slate-medium">
                    {area.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="publications" className="site-container section-y">
          <h2 className="text-display-s font-sans font-semibold">Publications</h2>
          <div className="mt-10">
            <div className="hidden grid-cols-12 gap-4 border-b border-slate/10 pb-3 md:grid">
              <span className="text-meta col-span-2">Date</span>
              <span className="text-meta col-span-2">Category</span>
              <span className="text-meta col-span-8">Title</span>
            </div>
            {publications.map((pub) => (
              <Link
                key={pub.title}
                href={pub.href}
                className="grid grid-cols-1 gap-2 border-b border-slate/10 py-5 transition-colors hover:text-clay md:grid-cols-12 md:items-baseline md:gap-4"
              >
                <span className="text-meta md:col-span-2">{pub.date}</span>
                <span className="text-meta md:col-span-2">{pub.category}</span>
                <span className="font-sans text-lg font-medium md:col-span-8">
                  {pub.title}
                </span>
              </Link>
            ))}
          </div>
          <Link href="/blog" className="btn-secondary mt-10 inline-flex">
            Browse all writing
            <span aria-hidden>→</span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
