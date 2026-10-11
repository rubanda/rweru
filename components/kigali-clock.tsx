"use client";

import { useEffect, useState } from "react";
import { contactHref } from "@/lib/playground";

export function KigaliClock({ dark = false }: { dark?: boolean }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const parts = now
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Kigali",
        hour: "2-digit",
        minute: "2-digit",
        weekday: "short",
        hourCycle: "h23",
      }).formatToParts(now)
    : [];
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? -1);
  const day = parts.find((part) => part.type === "weekday")?.value;
  const open = now && day !== "Sat" && day !== "Sun" && hour >= 9 && hour < 18;
  const time = now
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Kigali",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      }).format(now)
    : "--:--:--";
  return (
    <a
      href={contactHref("Hello Rweru! I’d like to discuss a project.")}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-xs ${dark ? "text-ivory/70 hover:text-ivory" : "text-slate-medium hover:text-clay"}`}
      title="Office hours: Monday–Friday, 09:00–18:00 Kigali time. This is an office-hours indicator, not live presence."
    >
      <span
        className={`size-1.5 rounded-full ${open ? "bg-kraft" : dark ? "bg-ivory/40" : "bg-slate/30"}`}
        aria-hidden
      />
      <span className="font-mono">Kigali {time}</span>
      <span>
        {now
          ? open
            ? "Office hours · WhatsApp us ↗"
            : "Leave us a WhatsApp message ↗"
          : "WhatsApp us ↗"}
      </span>
    </a>
  );
}
