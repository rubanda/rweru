
import Link from "next/link";

export default function Page() {
    return (
        <>
            <header className="sticky top-0 z-50 w-full px-4 md:px-10 py-4">
                <nav className="max-w-[1200px] mx-auto flex items-center justify-between bg-white/70 dark:bg-background-dark/70 backdrop-blur-xl border border-white/40 dark:border-white/10 px-6 py-3 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="size-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-xl">blur_on</span>
                        </div>
                        <h2 className="text-xl font-black leading-tight tracking-tighter uppercase">
                            RWERU
                        </h2>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            className="text-sm font-semibold hover:text-primary transition-colors"
                            href="#work"
                        >
                            Work
                        </Link>
                        <Link
                            className="text-sm font-semibold hover:text-primary transition-colors"
                            href="#services"
                        >
                            Services
                        </Link>
                        <Link
                            className="text-sm font-semibold hover:text-primary transition-colors"
                            href="#pricing"
                        >
                            Pricing
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="hidden sm:flex cursor-pointer items-center justify-center rounded-xl h-11 px-6 bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-sm font-bold transition-all hover:opacity-90">
                            Contact Us
                        </button>
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
            <main className="max-w-[1200px] mx-auto px-4 md:px-10 pb-20 space-y-16">
                <section className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
                    <div className="md:col-span-7 bg-white dark:bg-gray-800/50 p-8 md:p-14 rounded-3xl flex flex-col justify-center gap-8 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-widest rounded-full w-fit">
                            Software Design Studio
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-[-0.04em]">
                            Digital products <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                                crafted with care.
                            </span>
                        </h1>
                        <p className="text-slate-500 dark:text-gray-400 text-xl leading-relaxed max-w-lg">
                            RWERU is a boutique agency specializing in high-performance web
                            applications and seamless digital identities.
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
                    <div className="md:col-span-5 pastel-gradient-1 rounded-3xl overflow-hidden min-h-[450px] relative group border border-white">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] z-10 pointer-events-none"></div>
                        <div className="grid grid-cols-2 gap-4 p-6 h-full relative z-0">
                            <div className="space-y-4 pt-4">
                                <div
                                    className="w-full h-56 bg-center bg-cover rounded-2xl shadow-2xl"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDZCAEpS1iT3W_3uavn9C2R4E7yDnJFEm1Tn2FPJXYLDAktgWcp8sECZZhdbfllJTtfmjQPCuyLiKpZgGmg8RoXlG6yVDwo4bIjK1V4ErmxX6GEpdd7kRseD4ASlpOvmPWsEQUPYY11_ZroO2KfpOUx7AqaDywB9C1jToULj420XiOHVpakEIphu-fsmPvhAdPKqeNcec0dfkjrHntSq2-rQiyOmjXZP-YTkqo14qf34o4fpOtC2nb4hLarG9ljAvON8XYkkNnLkKE")',
                                    }}
                                ></div>
                                <div
                                    className="w-full h-72 bg-center bg-cover rounded-2xl shadow-2xl"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBckcR61z5fXnAER9VvmwSAx4BTSS2E6JR2yY4iZNqD1-dc3dg0UQuS4h2IhCrslQHcSBN9ZVnlI85KS8fRZZdaMI4oV26eORwTldxAhv8QZUogrHDqTW7B_bgSWo-lDCdZLGXoSZN-pgKs-TkLTJglXMfMonvI3yXZ3O5I1_wz-1lpe_He5CgulUw3lbGqpsHrzh-H5gJZDvqK0XL1rQz_HfttZIrD2NhdRe_J1ODTI0g4-2pCZAMojUStvQaWvDOi34SA43U2kVE")',
                                    }}
                                ></div>
                            </div>
                            <div className="space-y-4 pt-16">
                                <div
                                    className="w-full h-72 bg-center bg-cover rounded-2xl shadow-2xl"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDn1uDcELEVOBn54SGKx-yOd52UId1D9hYmFq8aktvh8-amCrU-cjh31MLzcuAftiDo4EYLRReA96SNPTc2C8LQEBNsU-y-EdnCXAjHumJX5YxiHR_JJdYguRN2bHVDNfKZxUgXkK89OIc9ZF1Wgtj2pHRH-tVoJFupGWtrDi54cKkbsVeZbpwfaWWVjKQPI2BBDA1sUTmHGuGDoiRHZfjNV_BdN5idZL-89Zl2IRiJwe3SMVBlR2-xVWAEBITsm8x67CTgYtb9OgY")',
                                    }}
                                ></div>
                                <div
                                    className="w-full h-56 bg-center bg-cover rounded-2xl shadow-2xl"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDotYU7VBZoyPYbtM4POVpzsgNRZMNABb_G6XDovSqnpF8gowSzV2HMSrH_oNt8CvG_HeTH1CIqHDRYUgWuXexPTFFLprry9bZktftwtfv5OcvzoM_ge0vP990k4TZU-wQu1sknLqRI38DJEycI3vdXKHT0S9sktfXNGd-LgkdcslD7fA9IWg-6No9F5XJFJlyWYXi-zG-jA6vMDhr2fmshnaSvJGzwexYihpdTX5ufPp-S3lP4B8t84vcs95-6c5I4H424FesLoX4")',
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="space-y-8" id="work">
                    <div className="flex flex-col md:flex-row md:items-end justify-between px-2 gap-4">
                        <div>
                            <h2 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3">
                                Recent Projects
                            </h2>
                            <h3 className="text-4xl font-black tracking-tight">
                                Selected Work
                            </h3>
                        </div>
                        <p className="text-slate-500 max-w-sm text-sm">
                            A collection of websites designed and developed to empower
                            communities and organizations.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-8 group bento-card rounded-3xl overflow-hidden flex flex-col md:flex-row">
                            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                                <div
                                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBMUSYfpMeSDmJMCZ_ZyRFUiAypWEGaXbAsI528Sbk40qVRsxkhKGu66-aaHaQ1HRUfdhp0rHusniX6Kl6TqIUPjJIBiqsc3T2xE1Z8adQjQmfO91ZmZ_VmGErbc5wOsHXVO9MrdetjS9gBe5V3EJ1NUHmQh-Usx6Bkawpmqm532pbhjK9onH4lCUQYw_FLxxzzvWfsz2idFfy16wkSFiFOp5-0N-2tMqSYPUBLfCkeqR5Cm9O9TgqpjNyfKIBj6DD81B72ktH7fiI")',
                                    }}
                                ></div>
                            </div>
                            <div className="md:w-1/2 p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-full">
                                            Non-profit
                                        </span>
                                    </div>
                                    <h4 className="text-2xl font-bold mb-2">
                                        rubandajacques.org
                                    </h4>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                        A digital memorial and resource hub designed with a focus on
                                        legacy and accessibility.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                        Next.js
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                        Tailwind CSS
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                        Sanity CMS
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-4 group bento-card rounded-3xl overflow-hidden pastel-gradient-2 p-1">
                            <div className="bg-white dark:bg-gray-800 h-full w-full rounded-[22px] overflow-hidden flex flex-col">
                                <div className="h-48 overflow-hidden">
                                    <div
                                        className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBrEmcfmZVS6i8DV-5JwI8VzR15fOE5wt64iqXXnUuLKvuqPUzbEDDzJh6rotFp8ToAxFV4TYPmFNLR0NkIQgyyrKL6-OUOjcjU42dNcoffteyma4wVJ_dmAExYc2idjXYGed-h-inc3PFcPlWSK8wb2AETvwx42x-EHH8TsuhXyZkXW7rWTsO8ZsSKPjZoT2IgJJTqVcNVqgfEeS8qr7gKJtLHFxZzU16_DHYvA1rFJYhN73Z_LovQRVGZAIh1HH8Fas2zWQe8DTE")',
                                        }}
                                    ></div>
                                </div>
                                <div className="p-8 flex-grow">
                                    <h4 className="text-xl font-bold mb-2">newjerusalem.lu</h4>
                                    <p className="text-slate-500 text-sm mb-6">
                                        Community platform for a vibrant spiritual group in
                                        Luxembourg.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        <span className="text-[10px] font-bold px-2 py-1 bg-sky-50 text-sky-600 rounded">
                                            React
                                        </span>
                                        <span className="text-[10px] font-bold px-2 py-1 bg-sky-50 text-sky-600 rounded">
                                            Node.js
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-4 group bento-card rounded-3xl overflow-hidden flex flex-col">
                            <div className="h-48 overflow-hidden">
                                <div
                                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4rZZ6ixS4owpHWd4vEzfovJX2q8Mp8ygSwts_wn9eqsa269I-ZWK96j2CYFQdH8jomypOZe1aKJeyKQfwl5NBx5Z_FC31FV3qwfDTdHY1DvAQ-H2W8VQ4ze879bGPY9_vbg5Q3Xykm_tscC8sM19s3g_Iw9d-ifPdO2R7cuFtflqcYhq0mpO0LuPyXnay1JO7QbTCwwTEQEgeTqKbR1Q6hFmM-UYfILRFbQMJpoYpWMra_kef21GahPCNDmPXrkKqrCpeOK27Aa0")',
                                    }}
                                ></div>
                            </div>
                            <div className="p-8">
                                <h4 className="text-xl font-bold mb-2">njc.org.rw</h4>
                                <p className="text-slate-500 text-sm mb-6">
                                    Official portal for the New Jerusalem Church in Rwanda,
                                    optimized for mobile traffic.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] font-bold px-2 py-1 bg-emerald-50 text-emerald-600 rounded">
                                        Vue.js
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-1 bg-emerald-50 text-emerald-600 rounded">
                                        Firebase
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-8 group bento-card rounded-3xl overflow-hidden flex flex-col md:flex-row-reverse">
                            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                                <div
                                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBNtJevB-86uvYfr6UXGvZJurc7AS957qoU17ZN3jFfz4OJSufpz3wWwL2vzUFoCUMaVkZHvQEri7O_L9Q3vbbiTojgDczKQII4QvIiySoVRk3spwnxO_fE7Bf3d1jqNjKE6ii8pvBAGj7ADxytIywr94ZGFD6RskTCJ7ZF2rvkEYvkjZKpQtsBcHzmCBMc5_4MxR7_N8cgxpJjcvqr_wgJh_dGBf6FILN6btP2pzbNdrb4VL93vQci9uMYucvUp03RzSl79Abz918")',
                                    }}
                                ></div>
                            </div>
                            <div className="md:w-1/2 p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase rounded-full">
                                            SaaS
                                        </span>
                                    </div>
                                    <h4 className="text-2xl font-bold mb-2">merci.rweru.com</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                        A custom-built donation management system focused on
                                        transparency and user experience.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] font-bold px-2 py-1 bg-pink-50 text-pink-600 rounded">
                                        TypeScript
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-1 bg-pink-50 text-pink-600 rounded">
                                        Stripe API
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-1 bg-pink-50 text-pink-600 rounded">
                                        PostgreSQL
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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
                <section className="space-y-12" id="pricing">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black">Invest in your Vision</h2>
                        <div className="flex items-center justify-center gap-4">
                            <span className="text-sm font-bold text-slate-400">Monthly</span>
                            <button className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full relative flex items-center px-1">
                                <div className="w-4 h-4 bg-primary rounded-full absolute right-1"></div>
                            </button>
                            <span className="text-sm font-bold text-primary">
                                Annual{" "}
                                <span className="ml-2 text-[10px] bg-primary/10 px-2 py-0.5 rounded-full">
                                    Save 15%
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-800/50 p-10 rounded-3xl border border-slate-100 dark:border-gray-700 flex flex-col h-full shadow-sm">
                            <h3 className="text-lg font-bold mb-1">MVP Package</h3>
                            <p className="text-slate-400 text-xs mb-6">
                                For startups launching fast.
                            </p>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-5xl font-black">$3,500</span>
                                <span className="text-slate-400">/prj</span>
                            </div>
                            <ul className="space-y-5 flex-grow mb-10">
                                <li className="flex items-center gap-3 text-sm font-medium">
                                    <span className="material-symbols-outlined text-primary text-lg">
                                        check_circle
                                    </span>
                                    Custom Landing Page
                                </li>
                                <li className="flex items-center gap-3 text-sm font-medium">
                                    <span className="material-symbols-outlined text-primary text-lg">
                                        check_circle
                                    </span>
                                    UI Kit Design
                                </li>
                                <li className="flex items-center gap-3 text-sm font-medium">
                                    <span className="material-symbols-outlined text-primary text-lg">
                                        check_circle
                                    </span>
                                    CMS Integration
                                </li>
                            </ul>
                            <button className="w-full py-4 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all">
                                Select MVP
                            </button>
                        </div>
                        <div className="pastel-gradient-3 p-1 rounded-[32px] shadow-2xl shadow-primary/10 transform md:-translate-y-4">
                            <div className="bg-white dark:bg-slate-900 p-10 rounded-[28px] flex flex-col h-full">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-lg font-bold">Product Partner</h3>
                                    <span className="bg-primary text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest">
                                        Popular
                                    </span>
                                </div>
                                <p className="text-slate-400 text-xs mb-6">
                                    For teams requiring ongoing design.
                                </p>
                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-5xl font-black">$5,900</span>
                                    <span className="text-slate-400">/mo</span>
                                </div>
                                <ul className="space-y-5 flex-grow mb-10">
                                    <li className="flex items-center gap-3 text-sm font-medium">
                                        <span className="material-symbols-outlined text-primary text-lg">
                                            verified
                                        </span>
                                        Unlimited Design Requests
                                    </li>
                                    <li className="flex items-center gap-3 text-sm font-medium">
                                        <span className="material-symbols-outlined text-primary text-lg">
                                            verified
                                        </span>
                                        Full-stack Development
                                    </li>
                                    <li className="flex items-center gap-3 text-sm font-medium">
                                        <span className="material-symbols-outlined text-primary text-lg">
                                            verified
                                        </span>
                                        Priority Slack Access
                                    </li>
                                </ul>
                                <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/30 hover:opacity-90 transition-all">
                                    Get Started
                                </button>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800/50 p-10 rounded-3xl border border-slate-100 dark:border-gray-700 flex flex-col h-full shadow-sm">
                            <h3 className="text-lg font-bold mb-1">Enterprise</h3>
                            <p className="text-slate-400 text-xs mb-6">
                                Complex custom ecosystems.
                            </p>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-5xl font-black">Custom</span>
                            </div>
                            <ul className="space-y-5 flex-grow mb-10">
                                <li className="flex items-center gap-3 text-sm font-medium">
                                    <span className="material-symbols-outlined text-primary text-lg">
                                        check_circle
                                    </span>
                                    Dedicated Squad
                                </li>
                                <li className="flex items-center gap-3 text-sm font-medium">
                                    <span className="material-symbols-outlined text-primary text-lg">
                                        check_circle
                                    </span>
                                    Cloud Architecture
                                </li>
                                <li className="flex items-center gap-3 text-sm font-medium">
                                    <span className="material-symbols-outlined text-primary text-lg">
                                        check_circle
                                    </span>
                                    Legacy Migration
                                </li>
                            </ul>
                            <button className="w-full py-4 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </section>
                <section className="pt-10 px-4" id="contact">
                    <div className="bg-slate-900 text-white p-10 md:p-24 rounded-[40px] text-center relative overflow-hidden group">
                        <div className="absolute -top-24 -right-24 size-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
                        <div className="absolute -bottom-24 -left-24 size-80 bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
                        <h2 className="text-xs font-bold text-primary uppercase tracking-[0.4em] mb-8">
                            Let's build together
                        </h2>
                        <a
                            className="text-4xl md:text-7xl font-black hover:text-primary transition-colors inline-block mb-12 tracking-tighter"
                            href="mailto:hello@rweru.com"
                        >
                            hello@rweru.com
                        </a>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-12 pt-12 border-t border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="size-12 bg-white/5 rounded-2xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">
                                        alternate_email
                                    </span>
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                                        Fast Response
                                    </p>
                                    <p className="text-sm font-bold">Within 24 Hours</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="size-12 bg-white/5 rounded-2xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">
                                        public
                                    </span>
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                                        Based in
                                    </p>
                                    <p className="text-sm font-bold">Kigali &amp; Luxembourg</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <button className="fixed bottom-8 right-8 size-16 bg-primary text-white rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
                <span className="material-symbols-outlined text-3xl">chat_bubble</span>
            </button>
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
        </>
    );
}