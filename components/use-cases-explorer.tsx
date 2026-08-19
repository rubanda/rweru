"use client";

import { useMemo } from "react";
import Link from "next/link";
import { filterOptions, useCases } from "@/lib/use-cases";
import { useUseCasesStore } from "@/lib/use-cases-store";
import { UseCaseCard } from "@/components/use-case-card";
import { cn } from "@/lib/utils";

function GridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="1" y="1" width="5" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.3" />
      <rect x="8" y="1" width="5" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.3" />
      <rect x="1" y="8" width="5" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.3" />
      <rect x="8" y="8" width="5" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1 3h12M1 7h12M1 11h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={cn("transition-transform duration-200", open && "rotate-180")}
    >
      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function FilterSection({
  title,
  filterKey,
  options,
  selected,
  onToggle,
}: {
  title: string;
  filterKey: "category" | "features" | "product";
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const openFilter = useUseCasesStore((state) => state.openFilter);
  const toggleFilterOpen = useUseCasesStore((state) => state.toggleFilterOpen);
  const open = openFilter === filterKey;

  return (
    <div className="border-b border-slate/10">
      <button
        type="button"
        onClick={() => toggleFilterOpen(filterKey)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-slate"
        aria-expanded={open}
      >
        {title}
        <ChevronIcon open={open} />
      </button>
      {open ? (
        <div className="flex flex-col gap-1 pb-4">
          {options.map((option) => {
            const active = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => onToggle(option)}
                className={cn(
                  "rounded-md px-2 py-2 text-left text-sm transition-colors",
                  active
                    ? "bg-slate/5 font-medium text-slate"
                    : "text-slate-medium hover:bg-slate/5 hover:text-slate"
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function UseCasesExplorer() {
  const view = useUseCasesStore((state) => state.view);
  const query = useUseCasesStore((state) => state.query);
  const selectedCategories = useUseCasesStore((state) => state.selectedCategories);
  const selectedFeatures = useUseCasesStore((state) => state.selectedFeatures);
  const selectedProducts = useUseCasesStore((state) => state.selectedProducts);
  const setView = useUseCasesStore((state) => state.setView);
  const setQuery = useUseCasesStore((state) => state.setQuery);
  const toggleCategory = useUseCasesStore((state) => state.toggleCategory);
  const toggleFeature = useUseCasesStore((state) => state.toggleFeature);
  const toggleProduct = useUseCasesStore((state) => state.toggleProduct);
  const clearFilters = useUseCasesStore((state) => state.clearFilters);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return useCases.filter((item) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(item.category);
      const matchesProduct =
        selectedProducts.length === 0 || selectedProducts.includes(item.product);
      const matchesFeatures =
        selectedFeatures.length === 0 ||
        selectedFeatures.every((feature) => item.features.includes(feature));
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.product.toLowerCase().includes(q) ||
        item.features.some((feature) => feature.toLowerCase().includes(q)) ||
        item.location.toLowerCase().includes(q);
      return matchesCategory && matchesProduct && matchesFeatures && matchesQuery;
    });
  }, [query, selectedCategories, selectedFeatures, selectedProducts]);

  const hasActiveFilters =
    query.trim().length > 0 ||
    selectedCategories.length > 0 ||
    selectedFeatures.length > 0 ||
    selectedProducts.length > 0;

  return (
    <>
      <section className="site-container pt-[clamp(3rem,6vw,5rem)] pb-10">
        <div className="max-w-3xl">
          <p className="text-meta mb-4">Client work, by RWERU Studio</p>
          <h1 className="text-display-xl font-serif font-normal text-slate">
            Get inspired by what we build
          </h1>
          <p className="mt-6 max-w-[46ch] font-sans text-base leading-relaxed text-slate-medium md:text-lg">
            Browse practical websites and applications across churches, hospitality,
            marketplaces, non-profits, and platforms — shipped for Rwanda, Uganda, and Europe.
          </p>
        </div>
      </section>

      <section className="site-container pb-[clamp(4rem,8vw,10rem)]">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-xl">
            <span className="sr-only">Search use cases</span>
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-light" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search use cases"
              className="h-11 w-full rounded-lg border border-slate/15 bg-transparent pl-10 pr-4 text-sm text-slate outline-none transition-colors placeholder:text-slate-light focus:border-slate/30"
            />
          </label>

          <div
            role="tablist"
            aria-label="View mode"
            className="inline-flex w-fit rounded-lg border border-slate/15 p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={view === "grid"}
              onClick={() => setView("grid")}
              className={cn(
                "inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                view === "grid"
                  ? "bg-slate/10 text-slate"
                  : "text-slate-medium hover:text-slate"
              )}
            >
              <GridIcon />
              Grid
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === "list"}
              onClick={() => setView("list")}
              className={cn(
                "inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                view === "list"
                  ? "bg-slate/10 text-slate"
                  : "text-slate-medium hover:text-slate"
              )}
            >
              <ListIcon />
              List
            </button>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] xl:grid-cols-[16rem_minmax(0,1fr)]">
          <aside>
            <h2 className="mb-2 text-sm font-semibold text-slate">Filter</h2>
            <FilterSection
              title="Category"
              filterKey="category"
              options={filterOptions.category}
              selected={selectedCategories}
              onToggle={toggleCategory}
            />
            <FilterSection
              title="Features"
              filterKey="features"
              options={filterOptions.features}
              selected={selectedFeatures}
              onToggle={toggleFeature}
            />
            <FilterSection
              title="Product"
              filterKey="product"
              options={filterOptions.product}
              selected={selectedProducts}
              onToggle={toggleProduct}
            />
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-sm text-slate-medium underline underline-offset-4 transition-colors hover:text-slate"
              >
                Clear all filters
              </button>
            ) : null}
          </aside>

          <div>
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-serif text-lg text-slate-medium">
                  No use cases match those filters.
                </p>
                <button type="button" className="btn-secondary mt-6" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            ) : view === "grid" ? (
              <div className="grid gap-8 md:grid-cols-2">
                {filtered.map((item, index) => (
                  <UseCaseCard key={item.slug} item={item} priority={index < 2} />
                ))}
              </div>
            ) : (
              <div>
                <div className="hidden grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,0.7fr))] gap-4 border-b border-slate/10 pb-3 lg:grid">
                  <span className="sr-only">Title</span>
                  <span className="text-meta">Author</span>
                  <span className="text-meta">Category</span>
                  <span className="text-meta">Product</span>
                  <span className="text-meta">Features</span>
                </div>

                <ul>
                  {filtered.map((item) => (
                    <li key={item.slug} className="border-b border-slate/10">
                      <Link
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group grid gap-3 py-6 transition-colors lg:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,0.7fr))] lg:items-start lg:gap-4"
                      >
                        <h3 className="font-serif text-xl leading-snug text-slate group-hover:text-clay md:text-2xl">
                          {item.title}
                        </h3>
                        <span className="text-sm text-slate-medium">
                          <span className="text-meta mr-2 lg:hidden">Author</span>
                          {item.author}
                        </span>
                        <span className="text-sm text-slate-medium">
                          <span className="text-meta mr-2 lg:hidden">Category</span>
                          {item.category}
                        </span>
                        <span className="text-sm text-slate-medium">
                          <span className="text-meta mr-2 lg:hidden">Product</span>
                          {item.product}
                        </span>
                        <span className="text-sm text-slate-medium">
                          <span className="text-meta mr-2 lg:hidden">Features</span>
                          {item.features.join(", ")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 rounded-2xl bg-slate px-8 py-12 text-ivory md:px-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-display-s font-sans font-semibold">
                Transform how your organization operates
              </h2>
              <p className="mt-4 max-w-[36ch] font-serif text-lg text-ivory/70">
                From church platforms to hospitality booking — RWERU Studio designs
                and ships software that fits African contexts.
              </p>
            </div>
            <Link href="/contact" className="btn-on-dark shrink-0">
              Start a project
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
