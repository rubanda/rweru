import Image from "next/image";
import Link from "next/link";
import type { UseCase } from "@/lib/use-cases";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8h9M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UseCaseCard({
  item,
  priority = false,
}: {
  item: UseCase;
  priority?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col rounded-[1.75rem] outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-clay"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-oat ring-1 ring-slate/10">
          <Image
            src={item.image}
            alt={`Preview of ${item.title}`}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 28vw, (min-width: 768px) 40vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="mt-5 h-px bg-slate" />

        <p className="mt-4 text-meta text-slate">
          {item.category}
          <span className="mx-2 text-cloud" aria-hidden>
            ·
          </span>
          {item.location}
        </p>

        <h3 className="mt-2 font-sans text-xl font-bold leading-snug tracking-tight text-slate md:text-[1.35rem]">
          {item.title}
        </h3>

        <div className="mt-auto flex items-center gap-2 pt-6">
          <span className="flex-1 rounded-full bg-ivory-dark px-5 py-2.5 text-center text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-slate transition-colors group-hover:bg-oat">
            View site
          </span>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ivory-dark text-slate transition-colors group-hover:bg-oat">
            <ArrowIcon />
          </span>
        </div>
      </Link>
    </article>
  );
}
