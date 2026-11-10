import type { Metadata } from "next";
import { Suspense } from "react";
import { Logo } from "@/components/logo";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Private sign-in for RweruSynapse internal documents.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-md rounded-2xl bg-ivory p-8 shadow-[0_1px_0_rgba(21,32,43,0.04)] ring-1 ring-slate/10 md:p-10">
        <Logo />
        <p className="text-meta mt-8">Documents</p>
        <h1 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-slate">
          Sign in
        </h1>
        <p className="mt-2 font-serif text-base text-slate-light">
          Private page for RweruSynapse company records.
        </p>
        <Suspense
          fallback={
            <div className="mt-8 h-48 animate-pulse rounded-lg bg-ivory-medium" />
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
