import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CommunityEventsExplorer } from "@/components/community-events-explorer";
import { RsvpForm } from "@/components/rsvp-form";
import { EventJsonLd } from "@/components/structured-data";
import { communityEvents } from "@/lib/events";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Community",
  description:
    "RWERU Community — workshops, ship nights, and learning paths for African developers, founders, students, and creators.",
  alternates: { canonical: "/community" },
  openGraph: {
    title: "Community | RweruSynapse",
    description:
      "RWERU Community — workshops, ship nights, and learning paths for African developers, founders, students, and creators.",
    url: "/community",
  },
};

const upcomingEvents = communityEvents.filter((event) => event.status === "Upcoming");

const volunteerLadder = [
  {
    step: "01",
    title: "Follower",
    description: "Reads updates and joins the newsletter.",
  },
  {
    step: "02",
    title: "Attendee",
    description: "RSVP'd and showed up to an event.",
  },
  {
    step: "03",
    title: "Volunteer",
    description: "Hosted, mentored, or brought new people.",
  },
  {
    step: "04",
    title: "Core",
    description: "Runs a recurring event or program.",
  },
];

export default function CommunityPage() {
  return (
    <>
      <Header />
      {upcomingEvents.map((event) => (
        <EventJsonLd key={event.slug} event={event} />
      ))}
      <main>
        <section className="site-container section-y-sm">
          <p className="text-meta mb-4">The volunteer ladder</p>
          <h2 className="text-display-s font-sans font-semibold text-slate">
            Everyone starts as a follower. Some grow into core.
          </h2>
          <p className="mt-4 max-w-[42ch] font-serif text-body-lg text-slate-medium">
            There&apos;s no gatekeeping — just a natural path from reading our updates to
            running your own program.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {volunteerLadder.map((rung) => (
              <div key={rung.step} className="rounded-2xl bg-oat p-6">
                <p className="text-meta">{rung.step}</p>
                <h3 className="mt-4 font-sans text-xl font-semibold text-slate">
                  {rung.title}
                </h3>
                <p className="mt-3 font-serif text-sm leading-relaxed text-slate-medium">
                  {rung.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <CommunityEventsExplorer />

        <section className="border-t border-slate/10 bg-ivory">
          <div className="site-container section-y">
            <p className="text-meta mb-4">Community Ambassador program</p>
            <h2 className="text-display-s font-sans font-semibold text-slate">
              For the volunteers who show up every time
            </h2>
            <p className="mt-4 max-w-[46ch] font-serif text-body-lg text-slate-medium">
              Ambassadors are volunteers who host sessions, mentor newcomers, or bring 3+
              new people to an event. In return:
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="border-t border-slate/10 pt-6">
                <h3 className="font-sans text-lg font-semibold text-slate">First access</h3>
                <p className="mt-3 font-serif text-sm leading-relaxed text-slate-medium">
                  Early invites to new events, learning paths, and community betas before
                  they&apos;re announced publicly.
                </p>
              </div>
              <div className="border-t border-slate/10 pt-6">
                <h3 className="font-sans text-lg font-semibold text-slate">A real title</h3>
                <p className="mt-3 font-serif text-sm leading-relaxed text-slate-medium">
                  Recognition as a {brand.community} Ambassador — on the site, in
                  recaps, and as a reference for future opportunities.
                </p>
              </div>
              <div className="border-t border-slate/10 pt-6">
                <h3 className="font-sans text-lg font-semibold text-slate">
                  A path to Core
                </h3>
                <p className="mt-3 font-serif text-sm leading-relaxed text-slate-medium">
                  Ambassadors who keep showing up get first consideration to run their own
                  recurring event or program.
                </p>
              </div>
            </div>
            <a href="#volunteer" className="btn-primary mt-10 inline-flex">
              Apply to volunteer
              <span aria-hidden>→</span>
            </a>
          </div>
        </section>

        <section id="volunteer" className="border-t border-slate/10 bg-oat">
          <div className="site-container section-y">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="text-meta mb-4">Become a volunteer</p>
                <h2 className="text-display-s font-sans font-semibold text-slate">
                  Don&apos;t want to wait for an event?
                </h2>
                <p className="mt-4 max-w-[40ch] font-serif text-body-lg text-slate-medium">
                  Tell us you&apos;re in, and we&apos;ll reach out with the next way to
                  host, mentor, or help run something.
                </p>
              </div>
              <div className="lg:col-span-6">
                <div className="rounded-2xl bg-ivory p-7">
                  <RsvpForm
                    eventSlug="general-volunteer"
                    eventTitle={brand.community}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
