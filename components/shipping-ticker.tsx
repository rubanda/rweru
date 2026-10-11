"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { shippingUpdates } from "@/lib/shipping";

export function ShippingTicker() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (paused || hovered) return;
    const timer = setInterval(
      () =>
        setIndex((previous) => (previous + 1) % shippingUpdates.items.length),
      5000,
    );
    return () => clearInterval(timer);
  }, [paused, hovered]);
  const item = shippingUpdates.items[index];
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setHovered(false);
      }}
      className="flex min-w-0 items-center gap-3 text-xs"
    >
      <span className="text-meta shrink-0">On our workbench</span>
      <Link
        href={item.href}
        className="flex min-w-0 items-center gap-2 text-slate-medium hover:text-clay"
      >
        <span className="truncate">
          {item.status}: {item.label}
        </span>
        <ArrowUpRight size={13} className="shrink-0" aria-hidden />
      </Link>
      <button
        type="button"
        onClick={() => setPaused((previous) => !previous)}
        aria-label={
          paused ? "Resume shipping updates" : "Pause shipping updates"
        }
        className="shrink-0 rounded p-2 text-slate-medium hover:bg-slate/5"
      >
        {paused ? (
          <Play size={12} aria-hidden />
        ) : (
          <Pause size={12} aria-hidden />
        )}
      </button>
      <span className="sr-only">Updated {shippingUpdates.updatedAt}</span>
    </div>
  );
}
