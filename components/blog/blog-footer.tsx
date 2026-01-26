
import Link from "next/link";

export function BlogFooter() {
    return (
        <footer className="w-full border-t border-gray-200 dark:border-white/10 mt-20 bg-gray-50/50 dark:bg-background-dark">
            <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="size-6 bg-black dark:bg-white rounded-md flex items-center justify-center text-white dark:text-black">
                                <span className="material-symbols-outlined text-sm font-bold">blur_on</span>
                            </div>
                            <span className="font-bold uppercase tracking-tight text-sm">RWERU</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
                            Building the future of digital experiences with modern technology and thoughtful design.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">Company</h4>
                        <Link href="/about" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">About</Link>
                        <Link href="/careers" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">Careers</Link>
                        <Link href="/contact" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">Contact</Link>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">Resources</h4>
                        <Link href="/blog" className="text-sm text-black dark:text-white font-medium">Blog</Link>
                        <Link href="/docs" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">Documentation</Link>
                        <Link href="/changelog" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">Changelog</Link>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">Legal</h4>
                        <Link href="/privacy" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">Privacy</Link>
                        <Link href="/terms" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">Terms</Link>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200 dark:border-white/5 gap-4">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        &copy; {new Date().getFullYear()} Rweru Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                            <span className="text-xs font-semibold">Twitter</span>
                        </Link>
                        <Link href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                            <span className="text-xs font-semibold">GitHub</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
