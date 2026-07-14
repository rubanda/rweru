"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  communityEvents,
  eventFilterOptions,
  learningPaths,
  type CommunityEvent,
} from "@/lib/events";
import { useEventsStore } from "@/lib/events-store";
import { cn } from "@/lib/utils";
import { blogPosts } from "@/lib/blog-data";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={cn("transition-transform duration-200", open && "rotate-45")}
    >
      <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function FilterBlock({
  title,
  filterKey,
  options,
  selected,
  onToggle,
}: {
  title: string;
  filterKey: "format" | "status" | "type";
  options: readonly string[];
  selected: readonly string[];
  onToggle: (value: string) => void;
}) {
  const openFilter = useEventsStore((s) => s.openFilter);
  const toggleFilterOpen = useEventsStore((s) => s.toggleFilterOpen);
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
        <Chevron open={open} />
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

function FeaturedCard({ event }: { event: CommunityEvent }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-oat">
      <div className="grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-10">
        <div>
          <p className="text-meta">{event.date}</p>
          <h3 className="mt-4 font-sans text-2xl font-semibold leading-snug text-slate md:text-3xl">
            {event.title}
          </h3>
          <p className="mt-4 max-w-[40ch] font-serif text-base leading-relaxed text-slate-medium md:text-lg">
            {event.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-medium">
            <span>{event.location}</span>
            <span aria-hidden>·</span>
            <span>{event.format}</span>
            <span aria-hidden>·</span>
            <span>{event.type}</span>
          </div>
          <Link href={event.href} className="btn-secondary mt-8 inline-flex">
            Learn more
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div
          aria-hidden
          className="relative hidden min-h-[180px] items-center justify-center md:flex"
        >
          <svg viewBox="0 0 240 180" className="h-full w-full max-w-[240px] text-slate">
            <circle cx="60" cy="90" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="180" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="110" cy="140" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M76 82L108 58M132 58L162 90M100 128L72 102M122 128L168 112"
              stroke="currentColor"
              strokeWidth="1.2"
              opacity="0.5"
            />
            <circle cx="60" cy="90" r="3" fill="currentColor" />
            <circle cx="120" cy="50" r="3" fill="currentColor" />
            <circle cx="180" cy="100" r="3" fill="currentColor" />
            <circle cx="110" cy="140" r="3" fill="currentColor" />
          </svg>
        </div>
      </div>
    </article>
  );
}

function EventListRow({ event }: { event: CommunityEvent }) {
  return (
    <Link
      href={event.href}
      className="group grid gap-2 border-b border-slate/10 py-5 transition-colors sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-baseline sm:gap-6"
    >
      <span className="font-sans text-lg font-medium text-slate group-hover:text-clay">
        {event.title}
        <span className="text-slate-light"> · </span>
        <span className="font-normal text-slate-medium">{event.type}</span>
      </span>
      <span className="hidden text-sm text-slate-medium sm:block">{event.location}</span>
      <span className="text-sm text-slate-medium sm:text-right">{event.date}</span>
    </Link>
  );
}

function EventGridCard({ event }: { event: CommunityEvent }) {
  return (
    <Link
      href={event.href}
      className="group flex h-full flex-col rounded-2xl bg-oat p-7 transition-transform duration-300 hover:-translate-y-0.5"
    >
      <p className="text-meta">{event.date}</p>
      <h3 className="mt-4 font-sans text-xl font-semibold leading-snug text-slate group-hover:text-clay">
        {event.title}
      </h3>
      <p className="mt-3 flex-1 font-serif text-base leading-relaxed text-slate-medium">
        {event.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-2 text-meta text-slate-light">
        <span>{event.format}</span>
        <span>·</span>
        <span>{event.type}</span>
      </div>
    </Link>
  );
}

export function CommunityEventsExplorer() {
  const query = useEventsStore((s) => s.query);
  const view = useEventsStore((s) => s.view);
  const sort = useEventsStore((s) => s.sort);
  const formats = useEventsStore((s) => s.formats);
  const statuses = useEventsStore((s) => s.statuses);
  const types = useEventsStore((s) => s.types);
  const setQuery = useEventsStore((s) => s.setQuery);
  const setView = useEventsStore((s) => s.setView);
  const setSort = useEventsStore((s) => s.setSort);
  const toggleFormat = useEventsStore((s) => s.toggleFormat);
  const toggleStatus = useEventsStore((s) => s.toggleStatus);
  const toggleType = useEventsStore((s) => s.toggleType);
  const clearFilters = useEventsStore((s) => s.clearFilters);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = communityEvents.filter((event) => {
      const matchesFormat = formats.length === 0 || formats.includes(event.format);
      const matchesStatus = statuses.length === 0 || statuses.includes(event.status);
      const matchesType = types.length === 0 || types.includes(event.type);
      const matchesQuery =
        !q ||
        event.title.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q) ||
        event.type.toLowerCase().includes(q);
      return matchesFormat && matchesStatus && matchesType && matchesQuery;
    });

    items = [...items].sort((a, b) => {
      if (sort === "date-desc") return b.dateIso.localeCompare(a.dateIso);
      if (sort === "date-asc") return a.dateIso.localeCompare(b.dateIso);
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

    return items;
  }, [query, formats, statuses, types, sort]);

  const featured =
    filtered.find((event) => event.featured && event.status === "Upcoming") ??
    filtered.find((event) => event.status === "Upcoming") ??
    null;

  const listEvents = featured
    ? filtered.filter((event) => event.slug !== featured.slug)
    : filtered;

  const hasFilters =
    query.trim().length > 0 ||
    formats.length > 0 ||
    statuses.length > 0 ||
    types.length > 0;

  const news = blogPosts.slice(0, 3);

  return (
    <>
      <section className="site-container section-y text-center">
        <h1 className="sr-only">RweruSynapse Community</h1>
        <p className="mx-auto max-w-[36ch] font-serif text-body-lg text-slate-medium md:text-2xl">
          Discover upcoming workshops, ship nights, and learning sessions — built for
          youth and builders across Rwanda and Africa.
        </p>
        <a href="#events" className="btn-primary mt-10 inline-flex">
          Browse all events
        </a>
      </section>

      <section id="events" className="site-container pb-[clamp(4rem,8vw,8rem)]">
        <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[16rem_minmax(0,1fr)]">
          <aside>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate">Filter</h2>
              {hasFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs text-slate-medium underline underline-offset-2 hover:text-slate"
                >
                  Clear filters
                </button>
              ) : null}
            </div>

            <div className="border-b border-slate/10 py-4">
              <label className="mb-2 block text-sm font-medium text-slate" htmlFor="event-search">
                Search
              </label>
              <input
                id="event-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Event name, date, location, etc."
                className="h-10 w-full rounded-lg border border-slate/15 bg-transparent px-3 text-sm outline-none placeholder:text-slate-light focus:border-slate/30"
              />
            </div>

            <FilterBlock
              title="Format"
              filterKey="format"
              options={eventFilterOptions.format}
              selected={formats}
              onToggle={(value) => toggleFormat(value as (typeof eventFilterOptions.format)[number])}
            />
            <FilterBlock
              title="Status"
              filterKey="status"
              options={eventFilterOptions.status}
              selected={statuses}
              onToggle={(value) => toggleStatus(value as (typeof eventFilterOptions.status)[number])}
            />
            <FilterBlock
              title="Event type"
              filterKey="type"
              options={eventFilterOptions.type}
              selected={types}
              onToggle={(value) => toggleType(value as (typeof eventFilterOptions.type)[number])}
            />
          </aside>

          <div>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-sans text-3xl font-semibold tracking-tight text-slate md:text-4xl">
                Events
              </h2>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-2 text-sm text-slate-medium">
                  <span>View</span>
                  <select
                    value={view}
                    onChange={(e) => setView(e.target.value as "list" | "grid")}
                    className="h-9 rounded-lg border border-slate/15 bg-transparent px-2 text-sm text-slate outline-none"
                  >
                    <option value="list">List</option>
                    <option value="grid">Grid</option>
                  </select>
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-medium">
                  <span>Sort</span>
                  <select
                    value={sort}
                    onChange={(e) =>
                      setSort(
                        e.target.value as
                          | "date-desc"
                          | "date-asc"
                          | "title-asc"
                          | "title-desc"
                      )
                    }
                    className="h-9 rounded-lg border border-slate/15 bg-transparent px-2 text-sm text-slate outline-none"
                  >
                    <option value="date-desc">Date (Recent)</option>
                    <option value="date-asc">Date (Oldest)</option>
                    <option value="title-asc">Name (A-Z)</option>
                    <option value="title-desc">Name (Z-A)</option>
                  </select>
                </label>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-slate/10 px-8 py-16 text-center">
                <h3 className="font-sans text-xl font-semibold text-slate">
                  We don&apos;t have any events matching those criteria yet
                </h3>
                <p className="mt-3 font-serif text-slate-medium">
                  Try adjusting your search or clearing some filters.
                </p>
                <button type="button" className="btn-secondary mt-8" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                {featured && view === "list" ? (
                  <div className="mb-10">
                    <FeaturedCard event={featured} />
                  </div>
                ) : null}

                {view === "list" ? (
                  <div>
                    {(featured ? [featured, ...listEvents] : listEvents).map((event) => (
                      <EventListRow key={event.slug} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {filtered.map((event) => (
                      <EventGridCard key={event.slug} event={event} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <section id="learn" className="border-t border-slate/10 bg-ivory">
        <div className="site-container section-y">
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-slate md:text-4xl">
            Learning paths
          </h2>
          <p className="mt-4 max-w-[42ch] font-serif text-lg text-slate-medium">
            Short tracks designed for youth — practical skills, real projects, community
            feedback.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {learningPaths.map((path) => (
              <Link
                key={path.slug}
                href={path.href}
                className="group rounded-2xl bg-oat p-8 transition-transform hover:-translate-y-0.5"
              >
                <p className="text-meta">{path.sessions} sessions</p>
                <h3 className="mt-4 font-sans text-xl font-semibold text-slate group-hover:text-clay">
                  {path.title}
                </h3>
                <p className="mt-3 font-serif text-base leading-relaxed text-slate-medium">
                  {path.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                  View path
                  <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container section-y">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-slate">
            What&apos;s new
          </h2>
          <Link href="/blog" className="text-sm font-medium text-slate-medium hover:text-slate">
            View more news
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {news.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group border-t border-slate/10 pt-5"
            >
              <p className="text-meta">{post.category}</p>
              <h3 className="mt-3 font-sans text-lg font-semibold leading-snug text-slate group-hover:text-clay">
                {post.title}
              </h3>
              <span className="mt-4 inline-flex text-sm font-medium">Learn more →</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="join" className="border-t border-slate/10 bg-slate text-ivory">
        <div className="site-container section-y">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 className="text-display-s font-sans font-semibold">
                Join the Synapse Community
              </h2>
              <p className="mt-4 max-w-[40ch] font-serif text-lg text-ivory/70">
                Event invites, learning paths, and community spotlights — for youth who
                want to learn and ship in Africa.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row lg:col-span-5">
              <label className="sr-only" htmlFor="community-email">
                Email
              </label>
              <input
                id="community-email"
                type="email"
                placeholder="Enter your email"
                className="h-12 flex-1 rounded-lg border border-ivory/20 bg-transparent px-4 text-sm text-ivory outline-none placeholder:text-ivory/40 focus:border-ivory/50"
              />
              <Link href="/contact" className="btn-on-dark shrink-0">
                Join free
              </Link>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
