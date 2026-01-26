import Link from "next/link";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full px-4 md:px-10 py-4">
            <nav className="max-w-[1200px] mx-auto flex items-center justify-between bg-white/70 dark:bg-background-dark/70 backdrop-blur-xl border border-white/40 dark:border-white/10 px-6 py-3 rounded-2xl shadow-sm">
                <Link href="/" className="flex items-center gap-2">
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
                    <Link href="/#contact">
                        <button className="hidden sm:flex cursor-pointer items-center justify-center rounded-xl h-11 px-6 bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-sm font-bold transition-all hover:opacity-90">
                            Contact Us
                        </button>
                    </Link>
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD0Ut_QWI1n6y7b1_4u_SSTPkBnxHf6GenASeF49P5617PqdUC963_1sAYn6j6t7LZrBb-Y913C02P1TRsSIxS4Nmg_DSJaPCGN-3Qq0BCaApJGWUeSKPfdqLM5r77sMgCcaAQeHrUbD8jm-MdD-NDEe0d3C8aW9LAXLHfkFC-LfbsKJhkEzGwmA8-NJPE01QvzjWh-r7EA0MMxQ4xW-SB79smF-1lBYiwgSXRnr4_t6Oqikiqwo3vF73t7ZyC-SqdzYzdFNaLoXoQ")',
                        }}
                    ></div>
                </div>
            </nav>
        </header>
    );
}
