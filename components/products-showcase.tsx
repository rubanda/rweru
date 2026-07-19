import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { masata } from "@/lib/brand";

export function ProductsShowcase() {
  const [masataProduct] = products;

  return (
    <section id="products" className="site-container section-y border-t border-slate/10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-meta mb-4">RWERU Products</p>
          <h2 className="text-display-s font-sans font-semibold text-slate">
            Products we build and run ourselves
          </h2>
          <p className="mt-4 max-w-[46ch] font-serif text-body-lg text-slate-medium">
            Separate from client work — software RweruSynapse owns and operates,
            starting with Masata.
          </p>
        </div>
        <Link href="/products" className="btn-secondary shrink-0">
          See all products
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="mt-12 overflow-hidden rounded-2xl bg-oat p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <p className="text-meta">{masataProduct.category} · Live</p>
            <h3 className="mt-4 font-sans text-2xl font-semibold text-slate md:text-3xl">
              {masata.byline}
            </h3>
            <p className="mt-4 max-w-[46ch] font-serif text-base leading-relaxed text-slate-medium md:text-lg">
              {masataProduct.description}
            </p>
            <p className="mt-4 text-sm text-slate-light">{masata.attribution}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={masataProduct.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Visit Masata
                <span aria-hidden>→</span>
              </a>
              <Link href="/products" className="btn-secondary">
                Explore RWERU Products
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
      </div>
    </section>
  );
}
