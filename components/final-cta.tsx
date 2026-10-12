import Link from "next/link";
import { brand } from "@/lib/brand";
import { contactHref } from "@/lib/playground";

export function FinalCta() {
  return (
    <section className="border-t border-slate/10 bg-slate text-ivory">
      <div className="site-container section-y flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-display-s font-sans font-semibold">
            Have a project, a research idea, or want to build with us?
          </h2>
          <p className="mt-4 max-w-[42ch] font-serif text-lg text-ivory/70">
            Whether you need software built, want to collaborate on research, or want
            to join the community — we&apos;d like to hear from you.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={contactHref("Hello Rweru! I’d like to discuss a project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-on-dark shrink-0"
          >
            Talk on WhatsApp
            <span aria-hidden>→</span>
          </a>
          <a
            href={`mailto:${brand.email}`}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-ivory/20 px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-ivory/10"
          >
            Email us
          </a>
          <Link
            href="/community"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-ivory/20 px-5 py-2.5 text-sm font-medium text-ivory/80 transition-colors hover:bg-ivory/10 hover:text-ivory"
          >
            Join the community
          </Link>
        </div>
      </div>
    </section>
  );
}
