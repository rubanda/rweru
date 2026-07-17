"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({
  source = "footer",
  tone = "dark",
}: {
  source?: string;
  tone?: "dark" | "light";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const isDark = tone === "dark";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <p className={`text-sm font-medium ${isDark ? "text-kraft" : "text-clay"}`}>
        You&apos;re subscribed. Watch for our next build log.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@organization.com"
          aria-label="Email address"
          className={
            isDark
              ? "h-11 min-w-0 flex-1 rounded-lg border border-ivory/15 bg-ivory/5 px-4 text-sm text-ivory placeholder:text-ivory/40 outline-none focus:border-kraft focus:ring-2 focus:ring-kraft/20"
              : "h-11 min-w-0 flex-1 rounded-lg border border-slate/10 bg-ivory px-4 text-sm outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={
            isDark
              ? "btn-on-dark shrink-0 disabled:opacity-60"
              : "btn-primary shrink-0 disabled:opacity-60"
          }
        >
          {status === "loading" ? "Joining…" : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </form>
  );
}
