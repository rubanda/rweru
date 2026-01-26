import Link from "next/link";

export function Footer() {
    return (
        <footer className="max-w-[1200px] mx-auto px-10 py-12 border-t border-slate-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
                <div className="size-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">blur_on</span>
                </div>
                <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
                    © 2024 RWERU. All rights reserved.
                </p>
            </div>
            <div className="flex gap-8">
                <Link
                    className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
                    href="#"
                >
                    Twitter
                </Link>
                <Link
                    className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
                    href="#"
                >
                    Github
                </Link>
                <Link
                    className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
                    href="#"
                >
                    LinkedIn
                </Link>
            </div>
        </footer>
    );
}
