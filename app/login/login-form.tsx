"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/dashboard/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
          next: searchParams.get("next"),
        }),
      });
      const result = (await response.json()) as {
        ok: boolean;
        error?: string;
        redirect?: string;
      };

      if (!response.ok || !result.ok) {
        setError(result.error ?? "Invalid email or password.");
        setPending(false);
        return;
      }

      window.location.assign(result.redirect ?? "/dashboard");
    } catch {
      setError("Something went wrong. Try again.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-slate">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="you@rweru.com"
          className="h-12 rounded-lg border border-slate/10 bg-ivory px-4 text-sm text-slate outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium text-slate">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="h-12 rounded-lg border border-slate/10 bg-ivory px-4 text-sm text-slate outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
        />
      </div>
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className="btn-primary h-12">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
