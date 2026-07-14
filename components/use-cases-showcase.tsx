import Link from "next/link";
import { useCases } from "@/lib/use-cases";
import { UseCaseCard } from "@/components/use-case-card";

export function UseCasesShowcase() {
  const featured = useCases.slice(0, 3);

  return (
    <section className="site-container section-y">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-meta mb-4">Use cases</p>
          <h2 className="text-display-s font-sans font-semibold text-slate">
            Get inspired by what we build
          </h2>
          <p className="mt-4 max-w-[42ch] font-serif text-body-lg text-slate-medium">
            Real websites and platforms shipped for churches, hotels, and non-profits
            across Rwanda, Uganda, and Europe.
          </p>
        </div>
        <Link href="/use-cases" className="btn-secondary shrink-0">
          Browse all use cases
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((item) => (
          <UseCaseCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
