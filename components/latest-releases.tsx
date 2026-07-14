import Link from "next/link";

const releases = [
  {
    title: "Opening the Synapse Community",
    body: "A space for African developers, designers, and founders to learn, ship, and contribute together.",
    date: "Jul 2026",
    category: "Community",
    href: "/community",
  },
  {
    title: "Software that fits African realities",
    body: "How we approach connectivity, payments, languages, and scale when building for Rwanda and beyond.",
    date: "Jun 2026",
    category: "Research",
    href: "/research",
  },
  {
    title: "From Kigali to the continent",
    body: "Our model for delivering product engineering, platforms, and long-term partnerships across Africa.",
    date: "May 2026",
    category: "Company",
    href: "/company",
  },
];

export function LatestReleases() {
  return (
    <section className="site-container section-y">
      <h2 className="text-display-s font-sans font-semibold text-slate">
        Latest releases
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {releases.map((item) => (
          <article
            key={item.title}
            className="group relative flex flex-col rounded-2xl bg-oat p-8 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Link href={item.href} className="absolute inset-0 rounded-2xl" aria-label={item.title} />
            <h3 className="font-sans text-xl font-semibold leading-snug text-slate">
              {item.title}
            </h3>
            <p className="mt-4 max-w-[35ch] flex-1 font-serif text-[1.05rem] leading-relaxed text-slate-medium">
              {item.body}
            </p>
            <div className="mt-8 flex flex-col gap-2 border-t border-slate/10 pt-5">
              <div className="flex justify-between gap-4">
                <span className="text-meta">Date</span>
                <span className="text-meta text-slate-light">{item.date}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-meta">Category</span>
                <span className="text-meta text-slate-light">{item.category}</span>
              </div>
            </div>
            <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-slate px-4 py-2 text-sm font-medium text-ivory">
              Read more
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
