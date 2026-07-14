import Link from "next/link";
import type { UseCase } from "@/lib/use-cases";

function domainFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function UseCaseCard({ item }: { item: UseCase }) {
  const domain = domainFromUrl(item.href);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-oat transition-transform duration-300 hover:-translate-y-0.5">
      <Link
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col"
      >
        <div className="relative aspect-video overflow-hidden bg-ivory-dark p-3 md:p-4">
          <div className="flex h-full flex-col rounded-lg border border-slate/10 bg-ivory shadow-sm">
            <div className="flex items-center gap-1.5 border-b border-slate/10 px-2.5 py-1.5">
              <span className="size-1.5 rounded-full bg-slate/20" />
              <span className="size-1.5 rounded-full bg-slate/20" />
              <span className="size-1.5 rounded-full bg-slate/20" />
              <span className="ml-2 truncate font-mono text-[0.6rem] text-slate-light">
                {domain}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-end p-3">
              <p className="text-meta mb-1">{item.category}</p>
              <p className="font-sans text-sm font-semibold leading-snug text-slate md:text-base">
                {item.title.split("—")[0].trim()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-sans text-base font-semibold leading-snug text-slate">
            {item.title}
          </h3>
          <p className="mt-2 line-clamp-2 font-serif text-[0.95rem] leading-relaxed text-slate-medium">
            {item.description}
          </p>

          <dl className="mt-4 flex flex-col gap-1.5 border-t border-slate/10 pt-4">
            <div className="flex justify-between gap-4">
              <dt className="text-meta">Author</dt>
              <dd className="text-meta text-slate-light">{item.author}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-meta">Product</dt>
              <dd className="text-meta text-slate-light">{item.product}</dd>
            </div>
          </dl>

          <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-slate px-3.5 py-1.5 text-sm font-medium text-ivory">
            View site
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
