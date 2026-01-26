export function Services() {
    return (
        <section className="space-y-10" id="services">
            <div className="text-center max-w-2xl mx-auto space-y-4">
                <h2 className="text-xs font-bold text-primary uppercase tracking-[0.2em]">
                    What we do
                </h2>
                <h3 className="text-4xl font-black">
                    Full-Cycle Product Development
                </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bento-card p-8 rounded-2xl">
                    <div className="size-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined">polyline</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3">UI/UX Strategy</h3>
                    <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">
                        User-centric design flows that convert visitors into loyal
                        customers.
                    </p>
                </div>
                <div className="bento-card p-8 rounded-2xl">
                    <div className="size-12 bg-purple-50 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined">code</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3">Web Engineering</h3>
                    <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">
                        Modern, fast, and responsive web applications built with the
                        latest tech.
                    </p>
                </div>
                <div className="bento-card p-8 rounded-2xl">
                    <div className="size-12 bg-pink-50 dark:bg-pink-900/30 text-pink-600 rounded-xl flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined">auto_awesome</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3">Brand Systems</h3>
                    <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">
                        Creating cohesive visual languages that tell your story across
                        platforms.
                    </p>
                </div>
                <div className="bento-card p-8 rounded-2xl">
                    <div className="size-12 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined">rocket</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3">Scale &amp; Growth</h3>
                    <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">
                        Optimization and performance tuning to handle high-traffic
                        environments.
                    </p>
                </div>
            </div>
        </section>
    );
}
