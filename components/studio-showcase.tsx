import Link from "next/link";
import { studioOfferings } from "@/lib/solutions";

export function StudioShowcase() {
  return (
    <section className="border-t border-slate/10 bg-ivory">
      <div className="site-container section-y">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-meta mb-4">RWERU Studio</p>
            <h2 className="text-display-s font-sans font-semibold text-slate">
              Custom software for organizations across Africa
            </h2>
            <p className="mt-4 max-w-[46ch] font-serif text-body-lg text-slate-medium">
              RWERU Studio is how we work with clients — design and engineering
              partnerships that ship real platforms, not just websites.
            </p>
          </div>
          <Link href="/solutions" className="btn-secondary shrink-0">
            See all solutions
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {studioOfferings.map((item) => (
            <article key={item.title} className="rounded-2xl bg-oat p-6">
              <h3 className="font-sans text-lg font-semibold text-slate">
                {item.title}
              </h3>
              <p className="mt-3 font-serif text-sm leading-relaxed text-slate-medium">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
