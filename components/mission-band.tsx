import Link from "next/link";
import { brand } from "@/lib/brand";

export function MissionBand() {
  return (
    <section className="relative overflow-hidden bg-slate text-ivory">
      <div
        aria-hidden
        className="network-drift pointer-events-none absolute inset-0 opacity-40"
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="180" cy="140" r="3" fill="#f7f9fb" opacity="0.5" />
          <circle cx="420" cy="90" r="2.5" fill="#f7f9fb" opacity="0.4" />
          <circle cx="680" cy="160" r="3" fill="#3d9a88" opacity="0.75" />
          <circle cx="920" cy="120" r="2.5" fill="#f7f9fb" opacity="0.45" />
          <circle cx="260" cy="320" r="2.5" fill="#f7f9fb" opacity="0.35" />
          <circle cx="540" cy="280" r="3.5" fill="#f7f9fb" opacity="0.55" />
          <circle cx="800" cy="340" r="2.5" fill="#f7f9fb" opacity="0.4" />
          <circle cx="1040" cy="300" r="3" fill="#3d9a88" opacity="0.55" />
          <circle cx="360" cy="480" r="2.5" fill="#f7f9fb" opacity="0.4" />
          <circle cx="720" cy="460" r="3" fill="#f7f9fb" opacity="0.5" />
          <circle cx="980" cy="500" r="2.5" fill="#f7f9fb" opacity="0.35" />
          <path
            d="M180 140L420 90L680 160L920 120M180 140L260 320L540 280L800 340L1040 300M420 90L540 280L720 460M680 160L800 340L980 500M260 320L360 480L720 460"
            stroke="#f7f9fb"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="site-container relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <h2 className="text-cta-display max-w-[18ch] font-serif font-normal">
          {brand.tagline}
        </h2>
        <p className="mt-8 max-w-[42ch] font-serif text-lg leading-relaxed text-ivory/70">
          {brand.description}
        </p>
        <Link href="/company" className="btn-on-dark mt-10">
          Learn more about {brand.company}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
