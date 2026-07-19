import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { products, upcomingProducts } from "@/lib/products";
import { masata } from "@/lib/brand";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "RWERU Products — software owned and operated by RweruSynapse, starting with Masata.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products | RweruSynapse",
    description:
      "RWERU Products — software owned and operated by RweruSynapse, starting with Masata.",
    url: "/products",
  },
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Products", href: "/products" }]} />
      {products.map((product) => (
        <ProductJsonLd
          key={product.slug}
          product={{
            name: product.name,
            description: product.description,
            href: product.href,
          }}
        />
      ))}
      <main>
        <section className="site-container section-y">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-meta mb-6">RWERU Products</p>
              <h1 className="text-display-xl font-sans font-bold text-slate">
                Software we own and operate ourselves.
              </h1>
            </div>
            <div className="flex items-end lg:col-span-5">
              <p className="max-w-[40ch] font-serif text-body-lg text-slate-medium">
                Separate from custom work we build for clients through{" "}
                <Link href="/solutions" className="link-underline">
                  RWERU Studio
                </Link>
                , RWERU Products are platforms RweruSynapse builds, owns, and maintains
                directly.
              </p>
            </div>
          </div>
        </section>

        <section id="masata" className="border-t border-slate/10 bg-ivory">
          <div className="site-container section-y">
            {products.map((product) => (
              <div key={product.slug} className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
                <div className="lg:col-span-7">
                  <p className="text-meta">{product.category} · {product.status}</p>
                  <h2 className="mt-4 font-sans text-2xl font-semibold text-slate md:text-3xl">
                    {product.byline}
                  </h2>
                  <p className="mt-3 font-serif text-lg text-slate-medium">
                    {product.tagline}
                  </p>
                  <p className="mt-6 max-w-[52ch] font-serif text-base leading-relaxed text-slate-medium">
                    {product.description}
                  </p>
                  <p className="mt-4 text-sm text-slate-light">{masata.attribution}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Visit Masata
                      <span aria-hidden>→</span>
                    </a>
                    <Link href="/use-cases" className="btn-secondary">
                      See Masata in use
                    </Link>
                  </div>
                </div>
                <div className="hidden lg:col-span-5 lg:block">
                  <div className="overflow-hidden rounded-2xl border border-slate/10 bg-ivory shadow-sm">
                    <div className="flex items-center gap-1.5 border-b border-slate/10 px-3 py-2">
                      <span className="size-2 rounded-full bg-slate/20" />
                      <span className="size-2 rounded-full bg-slate/20" />
                      <span className="size-2 rounded-full bg-slate/20" />
                      <span className="ml-2 truncate font-mono text-[0.65rem] text-slate-light">
                        masata.app
                      </span>
                    </div>
                    <Image
                      src="/products/masata-screenshot.png"
                      alt="Screenshot of the Masata by RWERU platform"
                      width={1440}
                      height={900}
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="site-container section-y">
          <h2 className="text-display-s font-sans font-semibold text-slate">
            What&apos;s next
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {upcomingProducts.map((item) => (
              <div key={item.name} className="rounded-2xl border border-dashed border-slate/20 p-8">
                <p className="text-meta">Coming soon</p>
                <h3 className="mt-4 font-sans text-xl font-semibold text-slate">
                  {item.name}
                </h3>
                <p className="mt-3 max-w-[42ch] font-serif text-base leading-relaxed text-slate-medium">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/community" className="btn-secondary">
              Join the community for updates
            </Link>
            <Link href="/contact" className="btn-secondary">
              Talk to us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
