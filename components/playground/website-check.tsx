"use client";

import { useState } from "react";
import { ArrowUpRight, Check, LoaderCircle, Minus } from "lucide-react";
import { LeadCapture, ToolCard, inputClass } from "./tool-ui";

type CheckResult = {
  url: string;
  inspection: {
    url: string;
    mobileViewport: boolean;
    whatsapp: boolean;
  } | null;
  performance: {
    score: number;
    lcp: string | null;
    speedIndex: string | null;
  } | null;
  notes: string[];
};

export function WebsiteCheck() {
  const [result, setResult] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function check(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const url = new FormData(event.currentTarget).get("url");
      const response = await fetch("/api/playground/website-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        signal: AbortSignal.timeout(60_000),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Could not check this website.");
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not connect. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <ToolCard
      id="website-check"
      number="02"
      title="How does your site hold up?"
      description="A real mobile performance check, plus a look for mobile viewport settings and a WhatsApp link."
    >
      <form onSubmit={check} className="flex flex-col gap-3 sm:flex-row">
        <label className="min-w-0 flex-1">
          <span className="sr-only">Website URL</span>
          <input
            name="url"
            required
            maxLength={2048}
            placeholder="https://your-business.com"
            className={inputClass}
            disabled={loading}
          />
        </label>
        <button
          className="btn-primary shrink-0 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle size={16} className="animate-spin" aria-hidden />
              Checking…
            </>
          ) : (
            "Check my website"
          )}
        </button>
      </form>
      <p className="mt-3 text-xs leading-relaxed text-slate-medium">
        Public websites only. Your URL is sent to Google PageSpeed Insights. A
        check can take up to a minute.
      </p>
      {loading && (
        <p role="status" className="mt-4 text-sm text-clay">
          Testing a simulated mobile visit. Hang tight.
        </p>
      )}
      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}
      {result && (
        <div className="mt-6 space-y-5" aria-live="polite">
          {result.performance && (
            <div className="flex items-center gap-5 rounded-2xl bg-clay/5 p-5">
              <div className="flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-clay font-mono text-2xl font-semibold text-clay">
                {result.performance.score}
              </div>
              <div>
                <p className="font-semibold">Mobile performance / 100</p>
                <p className="mt-1 text-xs text-slate-medium">
                  Largest contentful paint:{" "}
                  {result.performance.lcp ?? "Not available"}
                </p>
                <p className="mt-1 text-xs text-slate-medium">
                  Speed index:{" "}
                  {result.performance.speedIndex ?? "Not available"}
                </p>
              </div>
            </div>
          )}
          {result.inspection && (
            <ul className="space-y-3 text-sm">
              {[
                ["Mobile viewport", result.inspection.mobileViewport],
                ["WhatsApp link", result.inspection.whatsapp],
              ].map(([label, detected]) => (
                <li
                  key={String(label)}
                  className="flex items-center justify-between gap-3"
                >
                  <span>{label}</span>
                  <span className="flex items-center gap-2 text-slate-medium">
                    {detected ? (
                      <Check size={16} className="text-clay" aria-hidden />
                    ) : (
                      <Minus size={16} aria-hidden />
                    )}
                    {detected ? "Detected" : "Not found in page HTML"}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs leading-relaxed text-slate-medium">
            Scores vary with each run. HTML checks may miss buttons added by
            JavaScript; a viewport setting alone does not prove the whole site
            is mobile-friendly.
          </p>
          {result.notes.map((note) => (
            <p key={note} className="text-sm text-slate-medium">
              {note}
            </p>
          ))}
          <a
            href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(result.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-clay link-underline"
          >
            Open Google’s full report
            <ArrowUpRight size={15} aria-hidden />
          </a>
          <LeadCapture
            key={result.url}
            source="website-check"
            summary={`Website check for ${result.url}\n${JSON.stringify(result, null, 2)}`}
            buttonLabel="Help me improve my website"
          />
        </div>
      )}
    </ToolCard>
  );
}
