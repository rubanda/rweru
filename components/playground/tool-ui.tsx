"use client";

import { useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Download, Share2 } from "lucide-react";
import { contactHref } from "@/lib/playground";
import { playgroundToolHref } from "@/lib/playground-tools";

export const inputClass =
  "w-full rounded-xl border border-slate/15 bg-ivory px-4 py-3 text-sm focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20";

export function ToolCard({
  id,
  number,
  title,
  description,
  children,
  className = "",
}: {
  id: string;
  number: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 rounded-3xl border border-slate/10 bg-ivory p-6 md:p-9 ${className}`}
    >
      <p className="text-meta mb-3">Experiment {number}</p>
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-medium">
        {description}
      </p>
      <div className="mt-7">{children}</div>
    </section>
  );
}

export function DiscussLink({
  summary,
  children = "Let’s talk on WhatsApp",
}: {
  summary: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={contactHref(summary)}
      className="btn-primary"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={16} aria-hidden />
    </a>
  );
}

export function ShareResult({
  title,
  text,
  anchor,
}: {
  title: string;
  text: string;
  anchor: string;
}) {
  const [status, setStatus] = useState("");
  async function share() {
    const url = `${window.location.origin}${playgroundToolHref(anchor)}`;
    try {
      if (navigator.share) await navigator.share({ title, text, url });
      else {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        setStatus("Copied!");
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError"))
        setStatus("Sharing unavailable. Copy the page link from your browser.");
    }
  }
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={share} type="button" className="btn-secondary">
        <Share2 size={15} aria-hidden />
        Share result
      </button>
      <span role="status" className="text-xs text-slate-medium">
        {status}
      </span>
    </div>
  );
}

export function DownloadResult({
  text,
  filename = "rweru-starter-plan.txt",
}: {
  text: string;
  filename?: string;
}) {
  function download() {
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <button type="button" onClick={download} className="btn-secondary">
      <Download size={15} aria-hidden />
      Download plan
    </button>
  );
}

export function LeadCapture({
  source,
  summary,
  answers,
  onComplete,
  buttonLabel = "Send my project to Rweru",
}: {
  source: string;
  summary: string;
  answers?: number[];
  onComplete?: () => void;
  buttonLabel?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/playground/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source,
          summary,
          answers,
          name: form.get("name"),
          email: form.get("email"),
          whatsapp: form.get("whatsapp"),
          website: form.get("website"),
          consent: form.get("consent") === "on",
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 503) onComplete?.();
        throw new Error(result.error || "Please try again.");
      }
      setStatus("sent");
      onComplete?.();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Could not connect. Please try again.",
      );
    }
  }
  if (status === "sent")
    return (
      <p
        role="status"
        className="flex items-center gap-2 rounded-xl bg-clay/10 p-4 text-sm text-clay"
      >
        <Check size={18} aria-hidden />
        Sent to Rweru. We’ll follow up about your project.
      </p>
    );
  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-2xl border border-slate/10 bg-ivory-medium p-5"
    >
      <p className="text-sm font-medium">
        A useful result. A conversation when you’re ready.
      </p>
      <label className="block text-sm">
        Your name
        <input
          name="name"
          required
          maxLength={100}
          autoComplete="name"
          className={`${inputClass} mt-2`}
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Email
          <input
            name="email"
            type="email"
            maxLength={254}
            autoComplete="email"
            placeholder="you@business.com"
            className={`${inputClass} mt-2`}
          />
        </label>
        <label className="block text-sm">
          WhatsApp
          <input
            name="whatsapp"
            type="tel"
            maxLength={30}
            autoComplete="tel"
            placeholder="+250…"
            className={`${inputClass} mt-2`}
          />
        </label>
      </div>
      <p className="text-xs text-slate-medium">
        Provide an email or WhatsApp number, including its country code.
      </p>
      <div className="hidden" aria-hidden>
        <label>
          Leave empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="flex items-start gap-3 text-xs leading-relaxed text-slate-medium">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 size-4 shrink-0 accent-clay"
        />
        I agree that Rweru can use these details and my tool results to contact
        me about my project. This does not subscribe me to a newsletter.
      </label>
      <button
        disabled={status === "sending"}
        className="btn-primary w-full disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : buttonLabel}
      </button>
      {error && (
        <div role="alert" className="space-y-3 text-sm text-destructive">
          <p>{error}</p>
          <DiscussLink summary={summary}>Send directly on WhatsApp</DiscussLink>
        </div>
      )}
    </form>
  );
}
