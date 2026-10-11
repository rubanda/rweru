import Link from "next/link";
import {
  ArrowUpRight,
  Bug,
  CalendarDays,
  Check,
  Clock3,
  CreditCard,
  Globe2,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react";
import {
  playgroundToolHref,
  type PlaygroundTool,
  type PlaygroundToolSlug,
} from "@/lib/playground-tools";

function CardArtwork({ slug }: { slug: PlaygroundToolSlug }) {
  if (slug === "product-quiz")
    return (
      <div className="relative mx-auto w-full max-w-xs py-5">
        <div className="absolute inset-x-5 inset-y-0 rotate-[-6deg] rounded-2xl border border-white/10 bg-white/5" />
        <div className="relative rounded-2xl border border-white/20 bg-[#203340] p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#75d2bd]">
              Your next chapter
            </span>
            <Sparkles size={18} className="text-[#75d2bd]" />
          </div>
          <div className="mt-5 flex gap-1.5">
            {[0, 1, 2, 3, 4].map((index) => (
              <span
                key={index}
                className={`h-1.5 flex-1 rounded-full ${index < 3 ? "bg-[#75d2bd]" : "bg-white/15"}`}
              />
            ))}
          </div>
          <p className="mt-5 text-base font-medium text-white">
            A good idea, with a plan.
          </p>
          <div className="mt-4 space-y-2">
            {[
              "The right product",
              "Your first features",
              "A practical next step",
            ].map((label) => (
              <div
                key={label}
                className="flex items-center gap-2 text-xs text-[#b7c7d5]"
              >
                <Check size={13} className="text-[#75d2bd]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  if (slug === "website-check")
    return (
      <div className="flex items-center gap-6">
        <div className="relative flex size-24 items-center justify-center rounded-full border-[6px] border-[#75d2bd]/25 border-t-[#75d2bd] border-r-[#75d2bd]">
          <Globe2 size={35} className="text-[#75d2bd]" />
          <span className="absolute -bottom-1 -right-1 rounded-full bg-[#75d2bd] p-1 text-[#15202b]">
            <Check size={14} />
          </span>
        </div>
        <div className="space-y-3">
          {["Mobile speed", "Ready to connect"].map((label) => (
            <div key={label}>
              <p className="text-[10px] text-[#b7c7d5]">{label}</p>
              <div className="mt-2 h-1.5 w-24 rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-[#75d2bd]/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  if (slug === "estimator")
    return (
      <div className="w-full max-w-60">
        <div className="mb-6 flex items-center justify-between">
          <Clock3 size={26} className="text-[#75d2bd]" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#b7c7d5]">
            Make room for your idea
          </span>
        </div>
        <div className="flex items-center gap-2">
          {["Idea", "Build", "Launch"].map((label, index) => (
            <div key={label} className="flex-1">
              <div
                className={`h-8 rounded-lg ${index === 1 ? "bg-[#75d2bd]" : "bg-white/15"}`}
              />
              <p className="mt-3 text-center text-[10px] text-[#b7c7d5]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  if (slug === "app-builder")
    return (
      <div className="relative flex items-center gap-5">
        <div className="rotate-[-8deg] space-y-2">
          {[
            { label: "Bookings", icon: CalendarDays },
            { label: "Payments", icon: CreditCard },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-[10px] text-[#b7c7d5]"
            >
              <item.icon size={14} className="text-[#75d2bd]" />
              {item.label}
              <span className="ml-2 text-[#75d2bd]">+</span>
            </div>
          ))}
        </div>
        <div className="w-20 rotate-[7deg] rounded-[1.25rem] border-[3px] border-[#75d2bd]/50 bg-[#eef2f6] p-2">
          <div className="mx-auto h-1 w-6 rounded-full bg-[#15202b]" />
          <div className="mt-3 h-3 w-10 rounded bg-[#15202b]/15" />
          <div className="mt-2 h-8 rounded-lg bg-[#17665a]/20" />
          <div className="mt-2 grid grid-cols-2 gap-1">
            <div className="h-6 rounded bg-[#15202b]/10" />
            <div className="h-6 rounded bg-[#17665a]/40" />
          </div>
          <div className="mx-auto mt-4 h-1 w-6 rounded-full bg-[#15202b]/20" />
        </div>
      </div>
    );
  if (slug === "bingo")
    return (
      <div className="grid w-40 rotate-[-5deg] grid-cols-3 gap-2">
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index}
            className={`flex aspect-square items-center justify-center rounded-lg border ${[0, 4, 8].includes(index) ? "border-[#75d2bd] bg-[#75d2bd] text-[#15202b]" : "border-white/15 bg-white/5 text-white/25"}`}
          >
            {[0, 4, 8].includes(index) ? (
              <Check size={23} />
            ) : (
              <span className="size-1.5 rounded-full bg-current" />
            )}
          </div>
        ))}
      </div>
    );
  if (slug === "ship-night")
    return (
      <div className="flex items-center gap-7">
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }, (_, index) => (
            <div
              key={index}
              className={`flex size-9 items-center justify-center rounded-lg ${[1, 6].includes(index) ? "bg-[#75d2bd]/20 text-[#75d2bd]" : "bg-white/5 text-white/15"}`}
            >
              {[1, 6].includes(index) ? (
                <Bug size={23} />
              ) : (
                <span className="size-1 rounded-full bg-current" />
              )}
            </div>
          ))}
        </div>
        <Rocket
          size={52}
          strokeWidth={1.25}
          className="rotate-12 text-[#75d2bd]"
        />
      </div>
    );
  if (slug === "tech-quiz")
    return (
      <div className="text-center">
        <div className="mb-5 flex justify-center gap-2">
          <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] text-[#b7c7d5]">
            RW
          </span>
          <span className="text-[#75d2bd]">↔</span>
          <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] text-[#b7c7d5]">
            EN
          </span>
        </div>
        <p lang="rw" className="font-serif text-3xl text-white">
          Mudasobwa
        </p>
        <p className="mt-3 text-xs text-[#75d2bd]">Does that ring a bell?</p>
      </div>
    );
  return (
    <div className="w-full max-w-64 rounded-xl border border-white/15 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-white">Masata</span>
        <Users size={19} className="text-[#75d2bd]" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((index) => (
          <div key={index} className="h-10 rounded-md bg-[#75d2bd]/15" />
        ))}
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-2 w-4/5 rounded-full bg-white/15" />
        <div className="h-2 w-3/5 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

export function GalleryCard({ tool }: { tool: PlaygroundTool }) {
  return (
    <Link
      href={playgroundToolHref(tool.slug)}
      prefetch={false}
      aria-label={tool.title}
      aria-describedby={`card-description-${tool.slug}`}
      className={`group overflow-hidden rounded-3xl border transition-[border-color,box-shadow] hover:border-clay/50 hover:shadow-lg ${tool.featured ? "playground-navy grid border-[#15202b] md:grid-cols-[1.25fr_1fr]" : "flex h-full flex-col border-slate/10 bg-ivory"}`}
    >
      {tool.featured ? (
        <>
          <div className="flex flex-col items-start p-7 md:p-10">
            <span className="flex items-center gap-2 rounded-full border border-[#75d2bd]/25 bg-[#75d2bd]/10 px-3 py-1.5 text-xs text-[#75d2bd]">
              <Sparkles size={13} aria-hidden />A good place to start
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
              {tool.title}
            </h2>
            <p
              id={`card-description-${tool.slug}`}
              className="mt-4 max-w-md text-sm leading-relaxed text-[#b7c7d5]"
            >
              {tool.description}
            </p>
            <span className="mt-6 flex items-center gap-2 rounded-lg bg-[#75d2bd] px-5 py-3 text-sm font-medium text-[#15202b] group-hover:bg-[#a0e4d5]">
              {tool.action}
              <ArrowUpRight size={16} aria-hidden />
            </span>
            <span className="mt-4 font-mono text-[10px] uppercase tracking-wider text-[#b7c7d5]">
              {tool.duration} · No technical knowledge needed
            </span>
          </div>
          <div
            aria-hidden
            className="hidden items-center justify-center overflow-hidden bg-white/[0.03] px-8 py-6 md:flex md:p-10"
          >
            <CardArtwork slug={tool.slug} />
          </div>
        </>
      ) : (
        <>
          <div
            aria-hidden
            className="playground-navy flex h-48 shrink-0 items-center justify-center overflow-hidden p-6"
          >
            <CardArtwork slug={tool.slug} />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <p className="text-meta text-clay">{tool.duration}</p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">
              {tool.title}
            </h2>
            <p
              id={`card-description-${tool.slug}`}
              className="mt-3 flex-1 text-sm leading-relaxed text-slate-medium"
            >
              {tool.description}
            </p>
            <span className="mt-6 flex items-center justify-between gap-3 border-t border-slate/10 pt-4 text-sm font-medium text-clay">
              {tool.action}
              <ArrowUpRight size={17} aria-hidden />
            </span>
          </div>
        </>
      )}
    </Link>
  );
}
