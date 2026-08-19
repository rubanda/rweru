"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const INTERESTS = [
  "Software solutions (RWERU Studio)",
  "Products (RWERU Products / Masata)",
  "Research collaboration (RWERU Labs)",
  "Community / learning",
  "Other",
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          interest: data.get("interest"),
          message: data.get("message"),
        }),
      });
      const result = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-2xl border border-clay/20 bg-clay/5 px-8 py-10 font-serif text-lg leading-relaxed text-clay md:px-10">
        Message sent. We&apos;ll get back to you at the email you shared.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-oat p-8 md:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className="h-12 rounded-lg border border-slate/10 bg-ivory px-4 text-sm outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@organization.com"
            className="h-12 rounded-lg border border-slate/10 bg-ivory px-4 text-sm outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
          />
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <label htmlFor="interest" className="text-sm font-medium">
          I&apos;m interested in
        </label>
        <select
          id="interest"
          name="interest"
          required
          className="h-12 rounded-lg border border-slate/10 bg-ivory px-4 text-sm outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
        >
          {INTERESTS.map((interest) => (
            <option key={interest}>{interest}</option>
          ))}
        </select>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project or question..."
          className="resize-none rounded-lg border border-slate/10 bg-ivory p-4 text-sm outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary mt-8 w-full sm:w-auto disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
      {status === "error" ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
    </form>
  );
}
