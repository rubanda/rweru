import Link from "next/link";
import { labsFocusAreas } from "@/lib/research";

export function LabsTeaser() {
  const areas = labsFocusAreas.slice(0, 3);

  return (
    <section className="site-container section-y border-t border-slate/10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-meta mb-4">RWERU Labs</p>
          <h2 className="text-display-s font-sans font-semibold text-slate">
            Applied research and AI experiments
          </h2>
          <p className="mt-4 max-w-[46ch] font-serif text-body-lg text-slate-medium">
            RWERU Labs is our applied-research arm — early-stage AI experiments and
            notes on the software systems Africa needs, published as we learn.
          </p>
        </div>
        <Link href="/research" className="btn-secondary shrink-0">
          Visit RWERU Labs
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {areas.map((area) => (
          <div key={area.title} className="border-t border-slate/10 pt-6">
            <h3 className="font-sans text-lg font-semibold text-slate">{area.title}</h3>
            <p className="mt-3 font-serif text-sm leading-relaxed text-slate-medium">
              {area.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
