"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [isMenuOpen]);

    return (
        <header className="sticky top-0 z-50 w-full px-4 md:px-10 py-4">
            <nav className="max-w-[1200px] mx-auto flex items-center justify-between bg-white/70 dark:bg-background-dark/70 backdrop-blur-xl border border-white/40 dark:border-white/10 px-6 py-3 rounded-2xl shadow-sm relative z-50">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <div className="size-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-xl">blur_on</span>
                    </div>
                    <h2 className="text-xl font-black leading-tight tracking-tighter uppercase">
                        RWERU
                    </h2>
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        className="text-sm font-semibold hover:text-primary transition-colors"
                        href="/work"
                    >
                        Work
                    </Link>
                    <Link
                        className="text-sm font-semibold hover:text-primary transition-colors"
                        href="/#services"
                    >
                        Services
                    </Link>
                    <Link
                        className="text-sm font-semibold hover:text-primary transition-colors"
                        href="/blog"
                    >
                        Blog
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/#contact" className="hidden sm:block">
                        <button className="flex cursor-pointer items-center justify-center rounded-xl h-11 px-6 bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-sm font-bold transition-all hover:opacity-90">
                            Contact Us
                        </button>
                    </Link>
                    <div
                        className="hidden sm:block bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD0Ut_QWI1n6y7b1_4u_SSTPkBnxHf6GenASeF49P5617PqdUC963_1sAYn6j6t7LZrBb-Y913C02P1TRsSIxS4Nmg_DSJaPCGN-3Qq0BCaApJGWUeSKPfdqLM5r77sMgCcaAQeHrUbD8jm-MdD-NDEe0d3C8aW9LAXLHfkFC-LfbsKJhkEzGwmA8-NJPE01QvzjWh-r7EA0MMxQ4xW-SB79smF-1lBYiwgSXRnr4_t6Oqikiqwo3vF73t7ZyC-SqdzYzdFNaLoXoQ")',
                        }}
                    ></div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="material-symbols-outlined">
                            {isMenuOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-300 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                <div className="flex flex-col items-center gap-8 text-center p-8">
                    <Link
                        className="text-3xl font-bold tracking-tight hover:text-primary transition-colors"
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        className="text-3xl font-bold tracking-tight hover:text-primary transition-colors"
                        href="/work"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Work
                    </Link>
                    <Link
                        className="text-3xl font-bold tracking-tight hover:text-primary transition-colors"
                        href="/#services"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Services
                    </Link>
                    <Link
                        className="text-3xl font-bold tracking-tight hover:text-primary transition-colors"
                        href="/blog"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Blog
                    </Link>
                    <Link
                        className="text-3xl font-bold tracking-tight hover:text-primary transition-colors"
                        href="/#contact"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Contact
                    </Link>

                    {/* <div className="mt-8 flex items-center gap-4">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-14 border-2 border-primary/20"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD0Ut_QWI1n6y7b1_4u_SSTPkBnxHf6GenASeF49P5617PqdUC963_1sAYn6j6t7LZrBb-Y913C02P1TRsSIxS4Nmg_DSJaPCGN-3Qq0BCaApJGWUeSKPfdqLM5r77sMgCcaAQeHrUbD8jm-MdD-NDEe0d3C8aW9LAXLHfkFC-LfbsKJhkEzGwmA8-NJPE01QvzjWh-r7EA0MMxQ4xW-SB79smF-1lBYiwgSXRnr4_t6Oqikiqwo3vF73t7ZyC-SqdzYzdFNaLoXoQ")',
                            }}
                        ></div>
                    </div> */}
                </div>
            </div>
        </header>
    );
}
