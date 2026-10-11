"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/research", label: "Research" },
  { href: "/community", label: "Community" },
  { href: "/use-cases", label: "Work" },
  { href: "/company", label: "Company" },
  { href: "/blog", label: "Blog" },
  { href: "/playground", label: "Playground" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    document.querySelector<HTMLAnchorElement>("#mobile-navigation a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key !== "Tab") return;
      const items = Array.from(
        headerRef.current?.querySelectorAll<HTMLElement>("a[href], button") ??
          [],
      ).filter((item) => item.offsetParent !== null);
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50">
      <div
        className={`transition-[background-color,backdrop-filter] duration-300 ${
          scrolled || isMenuOpen
            ? "bg-ivory-medium/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="site-container flex h-[4.25rem] items-center justify-between gap-6">
          <Logo onClick={() => setIsMenuOpen(false)} />

          <div className="hidden items-center gap-4 xl:gap-5 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-sm font-medium text-slate/80 transition-colors duration-200 hover:text-slate"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden sm:block">
              <Link href="/contact" className="btn-primary whitespace-nowrap">
                Talk to us
              </Link>
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="flex size-10 items-center justify-center rounded-lg text-slate transition-colors hover:bg-slate/5 xl:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="sr-only">Menu</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden
              >
                {isMenuOpen ? (
                  <path
                    d="M4 4l10 10M14 4L4 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                ) : (
                  <path
                    d="M3 5h12M3 9h12M3 13h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-navigation"
        inert={!isMenuOpen}
        aria-hidden={!isMenuOpen}
        className={`fixed inset-x-0 top-[4.25rem] bottom-0 z-40 overflow-y-auto bg-ivory-medium transition-opacity duration-300 xl:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
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
