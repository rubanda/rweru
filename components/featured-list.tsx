import Link from "next/link";

const featured = [
  {
    title: "How African teams can ship production software faster",
    category: "Blog",
    href: "/blog/shipping-software-in-africa",
  },
  {
    title: "Research agenda: inclusive digital infrastructure",
    category: "Research",
    href: "/research",
  },
  {
    title: "Join the Synapse Community — learn and contribute",
    category: "Community",
    href: "/community",
  },
  {
    title: "Masata, Eza Hotel, NJC Rwanda — see what we shipped",
    category: "Use cases",
    href: "/use-cases",
  },
];

export function FeaturedList() {
  return (
    <section className="site-container section-y border-t border-slate/10">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="max-w-[20ch] text-display-s font-sans font-semibold text-slate">
            Building capability across Rwanda and Africa
          </h2>
        </div>
        <ul className="lg:col-span-8">
          {featured.map((item) => (
            <li key={item.href} className="border-t border-slate/10 first:border-t-0">
              <Link
                href={item.href}
                className="group flex items-baseline justify-between gap-6 py-6 transition-colors"
              >
                <span className="font-sans text-lg font-medium text-slate group-hover:text-clay md:text-xl">
                  {item.title}
                </span>
                <span className="shrink-0 text-meta">{item.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
