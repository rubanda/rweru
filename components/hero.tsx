export function Hero() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
            <div className="md:col-span-7 flex flex-col justify-center gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-widest rounded-full w-fit">
                    Software Design Studio
                </span>
                <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-[-0.04em]">
                    Designing the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        Future of Digital.
                    </span>
                </h1>
                <p className="text-slate-500 dark:text-gray-400 text-xl leading-relaxed max-w-lg">
                    We build high-end software solutions for visionary brands using cutting-edge design and immersive 3D technology.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    <button className="px-10 py-5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/25 hover:scale-[1.03] transition-transform">
                        Start a Project
                    </button>
                    <button className="px-10 py-5 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-gray-600 transition-all">
                        View Our Work
                    </button>
                </div>
            </div>
            <div className="relative group md:col-span-5">
                <div className="w-full aspect-square bg-cover bg-center rounded-3xl shadow-2xl transform lg:rotate-2 group-hover:rotate-0 transition-transform duration-700 border border-white/10"
                    style={{
                        backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAPpj8pXUdxZ8U1YvwmCog1o2WiWLS-mm5JkKAbpUVaU-XYCkW7vNECaks3ByBo6UtW0m3M9xfyXzTI6LJhkP253JuVlPa0bOf5fRGbaNTPDb7V3wqNqIOSVcHMGnYlBBiBBvmiqIGNpf8bRxCQJu1TGVv1VFkSwmFC__K6PP89QvWdnmOeDCLjq-5MyjLlBVX48-NYD00wIy17gQP2yvNVcSdd_YimRHJ2YuXy5VCyfTWI3b8ifUaotXRx_WomzbqQwZY9kn8OlHQ")',
                    }}>
                </div>
            </div>
        </section>
    );
}
