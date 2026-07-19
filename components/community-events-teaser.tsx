import Link from "next/link";
import { communityEvents } from "@/lib/events";
import { brand } from "@/lib/brand";

export function CommunityEventsTeaser() {
  const upcoming = communityEvents
    .filter((event) => event.status === "Upcoming")
    .sort((a, b) => a.dateIso.localeCompare(b.dateIso))
    .slice(0, 3);

  return (
    <section className="site-container section-y border-t border-slate/10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-meta mb-4">{brand.community}</p>
          <h2 className="text-display-s font-sans font-semibold text-slate">
            Learn together. Ship together.
          </h2>
          <p className="mt-4 max-w-[42ch] font-serif text-body-lg text-slate-medium">
            Workshops, ship nights, and learning paths for developers, founders, and
            students across Rwanda and Africa.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/community#events" className="btn-secondary shrink-0">
            Browse all events
            <span aria-hidden>→</span>
          </Link>
          <Link href="/community#volunteer" className="btn-secondary shrink-0">
            Become a volunteer
          </Link>
        </div>
      </div>

      <div className="mt-12">
        {upcoming.map((event) => (
          <Link
            key={event.slug}
            href={event.href}
            className="group grid gap-2 border-b border-slate/10 py-5 transition-colors sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-baseline sm:gap-6"
          >
            <span className="font-sans text-lg font-medium text-slate group-hover:text-clay">
              {event.title}
              <span className="text-slate-light"> · </span>
              <span className="font-normal text-slate-medium">{event.type}</span>
            </span>
            <span className="hidden text-sm text-slate-medium sm:block">
              {event.location}
            </span>
            <span className="text-sm text-slate-medium sm:text-right">{event.date}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
