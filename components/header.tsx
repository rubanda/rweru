"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "/research", label: "Research" },
  { href: "/solutions", label: "Solutions" },
  { href: "/use-cases", label: "Use cases" },
  { href: "/community", label: "Community" },
  { href: "/company", label: "Company" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
        scrolled || isMenuOpen
          ? "bg-ivory-medium/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="site-container flex h-[4.25rem] items-center justify-between gap-6">
        <Logo onClick={() => setIsMenuOpen(false)} />

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate/80 transition-colors duration-200 hover:text-slate"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn-primary hidden sm:inline-flex">
            Talk to us
          </Link>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="flex size-10 items-center justify-center rounded-lg text-slate transition-colors hover:bg-slate/5 lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">Menu</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              {isMenuOpen ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-x-0 top-[4.25rem] bottom-0 z-40 bg-ivory-medium transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="site-container flex flex-col gap-6 py-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-2xl font-medium tracking-tight text-slate"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-primary mt-4 w-fit"
            onClick={() => setIsMenuOpen(false)}
          >
            Talk to us
          </Link>
        </div>
      </div>
    </header>
  );
}
