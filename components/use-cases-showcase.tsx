import Link from "next/link";
import { useCases } from "@/lib/use-cases";
import { UseCaseCard } from "@/components/use-case-card";

export function UseCasesShowcase() {
  const featured = useCases.slice(0, 3);

  return (
    <section className="site-container section-y">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-meta mb-4">Client work</p>
          <h2 className="text-display-s font-sans font-semibold text-slate">
            Completed by RWERU Studio
          </h2>
          <p className="mt-4 max-w-[42ch] font-serif text-body-lg text-slate-medium">
            Real websites and platforms we&apos;ve shipped for churches, hotels,
            marketplaces, and non-profits across Rwanda, Uganda, and Europe — client-owned, built by us.
          </p>
        </div>
        <Link href="/use-cases" className="btn-secondary shrink-0">
          Browse our work
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((item, index) => (
          <UseCaseCard key={item.slug} item={item} priority={index === 0} />
        ))}
      </div>
    </section>
  );
}
