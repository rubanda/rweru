export function Contact() {
    return (
        <section className="py-20 px-4" id="contact">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-black leading-tight text-slate-900 dark:text-white">
                            Let's build <br />
                            <span className="text-primary">something extraordinary</span> <br />
                            together.
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md">
                            Whether you're a startup or an established enterprise, our team is ready to help you reach the next level.
                        </p>
                        <div className="flex flex-col gap-4 pt-8">
                            <div className="flex items-center gap-4">
                                <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-xl">mail</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Talk to us</p>
                                    <a href="mailto:hello@rweru.com" className="text-sm font-bold hover:text-primary transition-colors">hello@rweru.com</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-xl">location_on</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Visit us</p>
                                    <p className="text-sm font-bold">Kigali & Luxembourg</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100 dark:border-gray-700">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300">Name</label>
                                    <input type="text" id="name" placeholder="John Doe" className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-gray-700/50 border border-slate-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300">Email</label>
                                    <input type="email" id="email" placeholder="john@company.com" className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-gray-700/50 border border-slate-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="project-type" className="text-sm font-bold text-slate-700 dark:text-slate-300">Project Request</label>
                                <div className="relative">
                                    <select id="project-type" className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-gray-700/50 border border-slate-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium appearance-none text-slate-500">
                                        <option>Web Design</option>
                                        <option>Web Development</option>
                                        <option>Brand Identity</option>
                                        <option>Other</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300">Message</label>
                                <textarea id="message" rows={4} placeholder="Tell us about your project..." className="w-full p-4 rounded-xl bg-slate-50 dark:bg-gray-700/50 border border-slate-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium resize-none"></textarea>
                            </div>
                            <button type="submit" className="w-full h-14 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all">
                                Send Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
