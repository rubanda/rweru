import { useCases } from "@/lib/use-cases";
import { communityEvents, learningPaths } from "@/lib/events";

function shortName(title: string) {
  return title.split("—")[0].trim();
}

export function ProofStrip() {
  const clientNames = useCases.map((item) => shortName(item.title));
  const upcomingEvents = communityEvents.filter((event) => event.status === "Upcoming").length;

  const stats = [
    { value: `${useCases.length}`, label: "Live platforms & websites shipped" },
    { value: `${upcomingEvents}`, label: "Community events on the calendar" },
    { value: `${learningPaths.length}`, label: "Learning paths for new builders" },
  ];

  return (
    <section className="border-t border-b border-slate/10 bg-ivory-medium">
      <div className="site-container flex flex-col gap-10 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="flex flex-col gap-3">
          <p className="text-meta">Trusted across Rwanda, Uganda & Europe</p>
          <p className="max-w-[46ch] font-serif text-[1.05rem] leading-relaxed text-slate-medium">
            {clientNames.join(" · ")}
          </p>
        </div>

        <dl className="grid grid-cols-3 gap-6 lg:gap-10">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="font-sans text-2xl font-bold text-slate lg:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-1 max-w-[16ch] text-meta normal-case tracking-normal">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
