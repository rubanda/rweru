import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function WorkPage() {
    return (
        <>
            <Header />
            <main className="max-w-[1200px] mx-auto px-4 md:px-10 pb-20 space-y-16 pt-10">
                <section className="space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                            Our Portfolio
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-xl max-w-2xl mx-auto">
                            A showcase of our best work, ranging from non-profit platforms to innovative SaaS solutions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-10">
                        {/* Project 1: jFountain Mission (Non-profit) - 8 Cols */}
                        <Link href="https://www.jfountainmission.org/" target="_blank" className="md:col-span-8 group bento-card rounded-3xl overflow-hidden flex flex-col md:flex-row cursor-pointer">
                            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                                <div
                                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBMUSYfpMeSDmJMCZ_ZyRFUiAypWEGaXbAsI528Sbk40qVRsxkhKGu66-aaHaQ1HRUfdhp0rHusniX6Kl6TqIUPjJIBiqsc3T2xE1Z8adQjQmfO91ZmZ_VmGErbc5wOsHXVO9MrdetjS9gBe5V3EJ1NUHmQh-Usx6Bkawpmqm532pbhjK9onH4lCUQYw_FLxxzzvWfsz2idFfy16wkSFiFOp5-0N-2tMqSYPUBLfCkeqR5Cm9O9TgqpjNyfKIBj6DD81B72ktH7fiI")',
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <div className="md:w-1/2 p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-full">
                                            Non-profit
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="text-2xl font-bold">
                                            jFountain Mission
                                        </h4>
                                        <span className="material-symbols-outlined text-slate-400 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">arrow_forward</span>
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                        A dedicated platform for a non-profit organization and church, facilitating community engagement and outreach.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                        React
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                        Next.js
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Project 2: SafariCharger (Product) - 4 Cols */}
                        <Link href="https://www.safaricharger.com" target="_blank" className="md:col-span-4 group bento-card rounded-3xl overflow-hidden flex flex-col cursor-pointer">
                            <div className="h-48 overflow-hidden relative">
                                <div
                                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBrEmcfmZVS6i8DV-5JwI8VzR15fOE5wt64iqXXnUuLKvuqPUzbEDDzJh6rotFp8ToAxFV4TYPmFNLR0NkIQgyyrKL6-OUOjcjU42dNcoffteyma4wVJ_dmAExYc2idjXYGed-h-inc3PFcPlWSK8wb2AETvwx42x-EHH8TsuhXyZkXW7rWTsO8ZsSKPjZoT2IgJJTqVcNVqgfEeS8qr7gKJtLHFxZzU16_DHYvA1rFJYhN73Z_LovQRVGZAIh1HH8Fas2zWQe8DTE")',
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <div className="p-8 flex-grow flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="text-xl font-bold">SafariCharger</h4>
                                        <span className="material-symbols-outlined text-slate-400 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">arrow_forward</span>
                                    </div>
                                    <p className="text-slate-500 text-sm mb-6">
                                        Innovative charging solutions for modern needs.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] font-bold px-2 py-1 bg-amber-50 text-amber-600 rounded">
                                        Product
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                        Next.js
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Project 3: Rweru Farm (SaaS) - 4 Cols */}
                        <Link href="https://farm.rweru.com/" target="_blank" className="md:col-span-4 group bento-card rounded-3xl overflow-hidden flex flex-col cursor-pointer">
                            <div className="h-48 overflow-hidden relative">
                                <div
                                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4rZZ6ixS4owpHWd4vEzfovJX2q8Mp8ygSwts_wn9eqsa269I-ZWK96j2CYFQdH8jomypOZe1aKJeyKQfwl5NBx5Z_FC31FV3qwfDTdHY1DvAQ-H2W8VQ4ze879bGPY9_vbg5Q3Xykm_tscC8sM19s3g_Iw9d-ifPdO2R7cuFtflqcYhq0mpO0LuPyXnay1JO7QbTCwwTEQEgeTqKbR1Q6hFmM-UYfILRFbQMJpoYpWMra_kef21GahPCNDmPXrkKqrCpeOK27Aa0")',
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <div className="p-8 flex-grow flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="text-xl font-bold">Rweru Farm</h4>
                                        <span className="material-symbols-outlined text-slate-400 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">arrow_forward</span>
                                    </div>
                                    <p className="text-slate-500 text-sm mb-6">
                                        Comprehensive web application for smart farm management.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] font-bold px-2 py-1 bg-emerald-50 text-emerald-600 rounded">
                                        SaaS
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                        Postgres
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Project 4: Merci Rweru (Portfolio) - 8 Cols */}
                        <Link href="https://merci.rweru.com/" target="_blank" className="md:col-span-8 group bento-card rounded-3xl overflow-hidden flex flex-col md:flex-row-reverse cursor-pointer">
                            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                                <div
                                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBNtJevB-86uvYfr6UXGvZJurc7AS957qoU17ZN3jFfz4OJSufpz3wWwL2vzUFoCUMaVkZHvQEri7O_L9Q3vbbiTojgDczKQII4QvIiySoVRk3spwnxO_fE7Bf3d1jqNjKE6ii8pvBAGj7ADxytIywr94ZGFD6RskTCJ7ZF2rvkEYvkjZKpQtsBcHzmCBMc5_4MxR7_N8cgxpJjcvqr_wgJh_dGBf6FILN6btP2pzbNdrb4VL93vQci9uMYucvUp03RzSl79Abz918")',
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <div className="md:w-1/2 p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 bg-purple-50 text-purple-600 text-[10px] font-bold uppercase rounded-full">
                                            Portfolio
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="text-2xl font-bold">Merci Rweru</h4>
                                        <span className="material-symbols-outlined text-slate-400 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">arrow_forward</span>
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                        An immersive portfolio and gallery for an artist, showcasing drawings and creative works.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                        Next.js
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                        Artistic
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Project 5: Hema Rweru (SaaS) - 12 Cols */}
                        <Link href="https://hema.rweru.com/" target="_blank" className="md:col-span-12 group bento-card rounded-3xl overflow-hidden flex flex-col md:flex-row cursor-pointer bg-slate-900 text-white">
                            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                                <div
                                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD0Ut_QWI1n6y7b1_4u_SSTPkBnxHf6GenASeF49P5617PqdUC963_1sAYn6j6t7LZrBb-Y913C02P1TRsSIxS4Nmg_DSJaPCGN-3Qq0BCaApJGWUeSKPfdqLM5r77sMgCcaAQeHrUbD8jm-MdD-NDEe0d3C8aW9LAXLHfkFC-LfbsKJhkEzGwmA8-NJPE01QvzjWh-r7EA0MMxQ4xW-SB79smF-1lBYiwgSXRnr4_t6Oqikiqwo3vF73t7ZyC-SqdzYzdFNaLoXoQ")',
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-bold uppercase rounded-full">
                                        Lifestyle SaaS
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <h4 className="text-3xl md:text-4xl font-black">Hema Rweru</h4>
                                    <span className="material-symbols-outlined text-white/50 -rotate-45 text-3xl group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">arrow_forward</span>
                                </div>
                                <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                                    An all-in-one home management platform for tracking bills, groceries, healthcare, and more.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] font-bold px-3 py-1.5 bg-white/10 rounded text-white border border-white/10">
                                        Next.js
                                    </span>
                                    <span className="text-[10px] font-bold px-3 py-1.5 bg-white/10 rounded text-white border border-white/10">
                                        NestJS
                                    </span>
                                    <span className="text-[10px] font-bold px-3 py-1.5 bg-white/10 rounded text-white border border-white/10">
                                        Postgres
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Project 6: Masata (SaaS) - 8 Cols */}
                        <Link href="https://masata.rweru.com" target="_blank" className="md:col-span-8 group bento-card rounded-3xl overflow-hidden flex flex-col md:flex-row cursor-pointer">
                            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                                <div
                                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: 'url("/work/masata.png")',
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <div className="md:w-1/2 p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase rounded-full">
                                            SaaS Platform
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="text-2xl font-bold">Masata</h4>
                                        <span className="material-symbols-outlined text-slate-400 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">arrow_forward</span>
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                        Comprehensive SaaS for managing non-profit organizations and churches, connected to content platforms.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                        Next.js
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                        NestJS
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Project 7: Rubanda Jacques (Portfolio) - 4 Cols */}
                        <Link href="https://www.rubandajacques.org" target="_blank" className="md:col-span-4 group bento-card rounded-3xl overflow-hidden flex flex-col cursor-pointer">
                            <div className="h-48 overflow-hidden relative">
                                <div
                                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: 'url("/work/rubanda-jacques.png")',
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <div className="p-8 flex-grow flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="text-xl font-bold">Rubanda Jacques</h4>
                                        <span className="material-symbols-outlined text-slate-400 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">arrow_forward</span>
                                    </div>
                                    <p className="text-slate-500 text-sm mb-6">
                                        Personal portfolio and creative showcase.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                        Next.js
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                        Portfolio
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Project 8: NJC Rwanda (Non-profit) - 8 Cols */}
                        <Link href="https://njc.org.rw/" target="_blank" className="md:col-span-8 group bento-card rounded-3xl overflow-hidden flex flex-col md:flex-row-reverse cursor-pointer">
                            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                                <div
                                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: 'url("/work/njc-rwanda.png")',
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <div className="md:w-1/2 p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold uppercase rounded-full">
                                            Non-profit
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="text-2xl font-bold">NJC Rwanda</h4>
                                        <span className="material-symbols-outlined text-slate-400 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">arrow_forward</span>
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                        Official website for New Jerusalem Church in Rwanda, connected to Masata for content and events.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                        Next.js
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                        Masata API
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Project 9: NJC Luxembourg (Non-profit) - 4 Cols */}
                        <Link href="https://www.newjerusalem.lu/" target="_blank" className="md:col-span-4 group bento-card rounded-3xl overflow-hidden flex flex-col cursor-pointer">
                            <div className="h-48 overflow-hidden relative">
                                <div
                                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: 'url("/work/njc-lux.png")',
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <div className="p-8 flex-grow flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="text-xl font-bold">NJC Luxembourg</h4>
                                        <span className="material-symbols-outlined text-slate-400 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">arrow_forward</span>
                                    </div>
                                    <p className="text-slate-500 text-sm mb-6">
                                        New Jerusalem Church for Luxembourg, connected to Masata.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                        Next.js
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                        Non-profit
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
