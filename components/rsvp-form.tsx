"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type RsvpRole = "attendee" | "volunteer";
type RsvpStatus = "idle" | "pending" | "success" | "error";

export function RsvpForm({
  eventSlug,
  eventTitle,
}: {
  eventSlug: string;
  eventTitle: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<RsvpRole>("attendee");
  const [status, setStatus] = useState<RsvpStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  if (status === "success") {
    return (
      <p className="rounded-lg border border-clay/20 bg-clay/5 px-4 py-3 text-sm text-clay">
        You&apos;re on the list for {eventTitle}. We&apos;ll be in touch.
      </p>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("pending");
    setError(null);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventSlug, name, email, role }),
      });
      const data = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  const pending = status === "pending";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`rsvp-name-${eventSlug}`} className="text-sm font-medium">
            Name
          </label>
          <input
            id={`rsvp-name-${eventSlug}`}
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="h-12 rounded-lg border border-slate/10 bg-ivory px-4 text-sm outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`rsvp-email-${eventSlug}`} className="text-sm font-medium">
            Email
          </label>
          <input
            id={`rsvp-email-${eventSlug}`}
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-12 rounded-lg border border-slate/10 bg-ivory px-4 text-sm outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">I&apos;m coming as a...</span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setRole("attendee")}
            className={cn(
              "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
              role === "attendee"
                ? "border-clay bg-clay/10 text-clay"
                : "border-slate/10 bg-ivory text-slate-medium hover:border-slate/20"
            )}
          >
            Just attending
          </button>
          <button
            type="button"
            onClick={() => setRole("volunteer")}
            className={cn(
              "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
              role === "volunteer"
                ? "border-clay bg-clay/10 text-clay"
                : "border-slate/10 bg-ivory text-slate-medium hover:border-slate/20"
            )}
          >
            I want to volunteer at this one
          </button>
        </div>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <button type="submit" disabled={pending} className="btn-primary mt-1 disabled:opacity-60">
        {pending ? "Sending..." : "RSVP"}
      </button>
    </form>
  );
}
