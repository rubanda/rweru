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
        <div className="relative aspect-[16/10] overflow-hidden bg-ivory-dark p-5 md:p-6">
          <div className="flex h-full flex-col rounded-xl border border-slate/10 bg-ivory shadow-sm">
            <div className="flex items-center gap-1.5 border-b border-slate/10 px-3 py-2">
              <span className="size-2 rounded-full bg-slate/20" />
              <span className="size-2 rounded-full bg-slate/20" />
              <span className="size-2 rounded-full bg-slate/20" />
              <span className="ml-2 truncate font-mono text-[0.65rem] text-slate-light">
                {domain}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-end p-4">
              <p className="text-meta mb-2">{item.category}</p>
              <p className="font-sans text-base font-semibold leading-snug text-slate md:text-lg">
                {item.title.split("—")[0].trim()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-7">
          <h3 className="font-sans text-lg font-semibold leading-snug text-slate md:text-xl">
            {item.title}
          </h3>
          <p className="mt-3 flex-1 font-serif text-[1.05rem] leading-relaxed text-slate-medium">
            {item.description}
          </p>

          <dl className="mt-6 flex flex-col gap-2 border-t border-slate/10 pt-5">
            <div className="flex justify-between gap-4">
              <dt className="text-meta">Author</dt>
              <dd className="text-meta text-slate-light">{item.author}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-meta">Category</dt>
              <dd className="text-meta text-slate-light">{item.category}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-meta">Product</dt>
              <dd className="text-meta text-slate-light">{item.product}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-meta">Features</dt>
              <dd className="text-meta text-right text-slate-light">
                {item.features.join(", ")}
              </dd>
            </div>
          </dl>

          <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-slate px-4 py-2 text-sm font-medium text-ivory">
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
