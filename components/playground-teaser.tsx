import Link from "next/link";
import { ArrowUpRight, Blocks, Clock3, Sparkles } from "lucide-react";

const previews = [
  {
    title: "Find your first build",
    label: "5 questions · 1 starter plan",
    href: "/playground/product-quiz",
    icon: Sparkles,
  },
  {
    title: "Sketch your app",
    label: "Pick a business. Add your blocks.",
    href: "/playground/app-builder",
    icon: Blocks,
  },
  {
    title: "Size up your idea",
    label: "A rough timeline for your first version",
    href: "/playground/estimator",
    icon: Clock3,
  },
];

export function PlaygroundTeaser() {
  return (
    <section
      className="site-container section-y-sm"
      aria-labelledby="playground-heading"
    >
      <div className="playground-navy rounded-3xl p-7 md:p-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#75d2bd]">
              A little play. A real starting point.
            </p>
            <h2
              id="playground-heading"
              className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl"
            >
              What could we build for you?
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#b7c7d5]">
              Turn a business idea into a starter plan, try a tiny app, or see
              how your website performs. Our playground is open.
            </p>
          </div>
          <Link
            href="/playground/product-quiz"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-[#75d2bd] px-5 py-3 text-sm font-medium text-[#15202b] hover:bg-[#a0e4d5]"
          >
            Find my starting point
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
        <div className="mt-9 grid gap-3 md:grid-cols-3">
          {previews.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-white/15 bg-white/5 p-5 transition-colors hover:bg-white/10"
            >
              <item.icon size={22} className="text-[#75d2bd]" aria-hidden />
              <h3 className="mt-4 text-base font-medium">
                {item.title}
                <span aria-hidden className="float-right text-[#75d2bd]">
                  ↗
                </span>
              </h3>
              <p className="mt-2 text-xs text-[#b7c7d5]">{item.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
