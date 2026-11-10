"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import {
  FILTERS,
  GROUP_LABEL,
  type DashboardData,
  type DashboardItem,
  type Filter,
  type Group,
} from "@/lib/dashboard/types";

const CHIP: Record<Group, string> = {
  have: "bg-[#17665A]/12 text-[#17665A] dark:bg-[#75d2bd]/15 dark:text-[#75d2bd]",
  now: "bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-200",
  later: "bg-[#3D6B8A]/12 text-[#3D6B8A] dark:bg-[#8fb4cc]/15 dark:text-[#8fb4cc]",
  if: "bg-slate/8 text-[#4F5C6A] dark:bg-ivory/10 dark:text-slate-light",
};

function StatusChip({ group, children }: { group: Group; children: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[0.7rem] font-medium",
        CHIP[group],
      )}
    >
      {children}
    </span>
  );
}

function countGroup(items: DashboardItem[], group: Group) {
  return items.filter((item) => item.group === group).length;
}

export function DashboardView({
  data,
  email,
}: {
  data: DashboardData;
  email: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState("etax");
  const detailRef = useRef<HTMLElement>(null);
  const skipScroll = useRef(true);

  const list = useMemo(
    () =>
      filter === "all"
        ? data.items
        : data.items.filter((item) => item.group === filter),
    [data.items, filter],
  );

  const current = list.find((item) => item.id === selected) ?? list[0];

  function selectFilter(next: Filter) {
    setFilter(next);
    const nextList =
      next === "all"
        ? data.items
        : data.items.filter((item) => item.group === next);
    if (nextList[0] && !nextList.some((item) => item.id === selected)) {
      setSelected(nextList[0].id);
    }
  }

  useEffect(() => {
    if (skipScroll.current) {
      skipScroll.current = false;
      return;
    }
    if (window.matchMedia("(max-width: 1023px)").matches) {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected]);

  const have = countGroup(data.items, "have");
  const now = countGroup(data.items, "now");
  const later = countGroup(data.items, "later");
  const onlyIf = countGroup(data.items, "if");
  const progressTotal = have + now + later;
  const pct = progressTotal
    ? Math.round((have / progressTotal) * 100)
    : 0;

  const metrics = [
    { value: have, label: "Have", group: "have" as const },
    { value: now, label: "Missing, get now", group: "now" as const },
    { value: later, label: "Later (2027)", group: "later" as const },
    { value: onlyIf, label: "Only if needed", group: "if" as const },
  ];

  return (
    <div className="min-h-screen bg-ivory-medium text-slate">
      <header className="sticky top-0 z-40 border-b border-slate/10 bg-ivory-medium">
        <div className="site-container flex items-center justify-between gap-4 py-4">
          <div className="flex min-w-0 items-center gap-4">
            <Logo href="/dashboard" />
            <span className="hidden text-meta sm:inline">Documents</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden max-w-[16rem] truncate text-xs text-slate-light sm:inline">
              {email}
            </span>
            <form action="/api/dashboard/logout" method="POST">
              <button type="submit" className="btn-secondary h-9 px-3 text-xs">
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="site-container py-10 pb-20 md:py-14">
        <p className="text-meta">Internal</p>
        <h1 className="mt-3 max-w-[20rem] font-sans text-3xl font-bold tracking-tight text-slate sm:max-w-none md:text-4xl">
          {data.title}
        </h1>
        <p className="mt-4 max-w-[62ch] font-serif text-lg leading-relaxed text-slate-light">
          {data.summary}
        </p>

        <section className="mt-10">
          <h2 className="font-sans text-xl font-semibold">Where things stand</h2>
          <p className="mt-3 max-w-[70ch] font-serif text-base leading-relaxed text-slate-light">
            {data.asOf}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl bg-ivory p-5 ring-1 ring-slate/10"
              >
                <p className="font-sans text-3xl font-semibold tracking-tight">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm text-slate-light">{metric.label}</p>
                <div className="mt-3">
                  <StatusChip group={metric.group}>
                    {GROUP_LABEL[metric.group]}
                  </StatusChip>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-ivory p-5 ring-1 ring-slate/10">
            <div className="h-2.5 overflow-hidden rounded-full bg-ivory-dark">
              <div
                className="h-full rounded-full bg-clay"
                style={{ width: `${Math.max(pct, 2)}%` }}
              />
            </div>
            <p className="mt-3 font-mono text-xs text-slate-light">
              {have} of {progressTotal} items in place ({pct}%)
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-sans text-xl font-semibold">
            Documents and registrations
          </h2>
          <p className="mt-2 text-sm text-slate-light">
            Tap an item to see how to get it. Statuses are as recorded on 10 Nov
            2026.
          </p>
          <div
            role="tablist"
            aria-label="Filter documents"
            className="mt-5 flex flex-wrap gap-2"
          >
            {FILTERS.map((option) => {
              const active = filter === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectFilter(option.value)}
                  className={cn(
                    "min-h-10 rounded-full px-3.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-slate text-ivory"
                      : "border border-slate/15 bg-ivory text-slate hover:bg-ivory-dark",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex flex-col gap-1.5">
                {list.map((item) => {
                  const active = item.id === current?.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelected(item.id)}
                      className={cn(
                        "flex min-h-12 w-full flex-wrap items-center justify-between gap-2 rounded-xl px-3.5 py-3 text-left text-sm transition-colors",
                        active
                          ? "bg-ivory ring-1 ring-clay/40"
                          : "bg-ivory/60 hover:bg-ivory ring-1 ring-transparent",
                      )}
                    >
                      <span className="font-medium text-slate">{item.name}</span>
                      <StatusChip group={item.group}>
                        {GROUP_LABEL[item.group]}
                      </StatusChip>
                    </button>
                  );
                })}
              </div>
            </div>

            {current ? (
              <article
                ref={detailRef}
                className="scroll-mt-24 rounded-2xl bg-ivory p-5 ring-1 ring-slate/10 lg:col-span-7 lg:sticky lg:top-24 lg:self-start md:p-7"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-sans text-xl font-semibold text-slate">
                    {current.name}
                  </h3>
                  <StatusChip group={current.group}>{current.status}</StatusChip>
                </div>
                <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      ["Deadline", current.deadline],
                      ["Cost", current.cost],
                      ["How", current.route],
                      ["Where", current.where],
                      ["Time", current.time],
                      ["Contact", current.contact],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label} className="min-w-0">
                      <dt className="text-meta">{label}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-slate">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 font-serif text-base leading-relaxed text-slate-light">
                  {current.what}
                </p>
                <h4 className="mt-6 font-sans text-sm font-semibold">
                  What to bring or upload
                </h4>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate">
                  {current.docs.map((doc) => (
                    <li key={doc}>{doc}</li>
                  ))}
                </ul>
                <h4 className="mt-6 font-sans text-sm font-semibold">Steps</h4>
                <ol className="mt-3 space-y-3">
                  {current.steps.map((step, index) => (
                    <li key={step.title} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clay text-[0.7rem] font-semibold text-ivory">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-slate">
                          {step.title}
                        </p>
                        {step.detail ? (
                          <p className="mt-0.5 text-sm leading-relaxed text-slate-light">
                            {step.detail}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            ) : null}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-sans text-xl font-semibold">Offices and portals</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {data.portals.map((portal) => (
              <a
                key={portal.href}
                href={portal.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-ivory p-5 ring-1 ring-slate/10 transition-colors hover:ring-clay/40"
              >
                <p className="font-sans text-sm font-medium text-slate">
                  {portal.title}
                </p>
                <p className="mt-1 font-mono text-xs text-clay">{portal.site}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-sans text-xl font-semibold">Note</h2>
          <div className="mt-4 rounded-2xl bg-ivory p-5 ring-1 ring-slate/10">
            <p className="border-l-2 border-[#C4A35A] pl-4 text-sm font-medium text-slate">
              {data.noteLead}
            </p>
            <p className="mt-3 font-serif text-base leading-relaxed text-slate-light">
              {data.noteBody}
            </p>
          </div>
          <h3 className="mt-8 text-meta">Sources</h3>
          <ul className="mt-3 space-y-1.5">
            {data.sources.map((href) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all font-mono text-xs text-clay link-underline"
                >
                  {href}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
