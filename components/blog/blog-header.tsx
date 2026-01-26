
import Link from "next/link";

export function BlogHeader() {
    return (
        <header className="sticky top-0 z-50 w-full px-4 md:px-10 py-4">
            <nav className="max-w-[1200px] mx-auto flex items-center justify-between bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border border-gray-200 dark:border-white/10 px-6 py-3 rounded-2xl shadow-sm transition-all duration-300">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="size-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black shadow-lg ring-1 ring-black/5 dark:ring-white/20 transition-transform group-hover:scale-105">
                            <span className="material-symbols-outlined text-lg font-bold">article</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white group-hover:opacity-80 transition-opacity">
                            Rweru Blog
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6 pl-6 border-l border-gray-200 dark:border-gray-800 h-6">
                        <Link
                            href="/blog"
                            className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            All Posts
                        </Link>
                        <Link
                            href="/blog?category=engineering"
                            className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            Engineering
                        </Link>
                        <Link
                            href="/blog?category=product"
                            className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            Product
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href="/rss.xml"
                        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">rss_feed</span>
                        <span>RSS</span>
                    </a>
                    <Link
                        href="https://x.com"
                        target="_blank"
                        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Follow
                    </Link>
                </div>
            </nav>
        </header>
    );
}
