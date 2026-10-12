import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function PlaygroundTeaser() {
  return (
    <section
      className="site-container section-y-sm"
      aria-labelledby="playground-heading"
    >
      <div className="playground-navy rounded-3xl p-7 md:p-12">
        <p className="font-mono text-xs uppercase tracking-widest text-[#75d2bd]">
          A little play. A real starting point.
        </p>
        <h2
          id="playground-heading"
          className="mt-4 max-w-[18ch] text-3xl font-semibold tracking-tight md:text-4xl"
        >
          What could we build for you?
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#e4edf4]">
          Five questions. One starter plan. The rest of the playground is a
          click away if you want to sketch or size an idea.
        </p>

        <Link
          href="/playground/product-quiz"
          className="group mt-9 flex flex-col gap-5 rounded-2xl border border-white/20 bg-white/10 p-5 transition-colors hover:bg-white/15 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <span className="flex min-w-0 items-start gap-4">
            <Sparkles size={22} className="mt-0.5 shrink-0 text-[#75d2bd]" aria-hidden />
            <span>
              <span className="block text-xl font-medium text-[#f7f9fb]">
                Find your first build
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-[#dce6ef]">
                Five questions · 1 starter plan
              </span>
            </span>
          </span>
          <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-[#75d2bd] px-5 py-3 text-sm font-medium text-[#15202b] group-hover:bg-[#a0e4d5]">
            Find my starting point
            <ArrowUpRight size={16} aria-hidden />
          </span>
        </Link>

        <Link
          href="/playground"
          className="mt-5 inline-block text-sm text-[#d7e3ed] underline-offset-4 transition-colors hover:text-[#75d2bd] hover:underline"
        >
          More tools
        </Link>
      </div>
    </section>
  );
}
