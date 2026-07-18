import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with RweruSynapse — software solutions from Kigali, Rwanda.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | RweruSynapse",
    description: "Get in touch with RweruSynapse — software solutions from Kigali, Rwanda.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="site-container section-y">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-meta mb-6">Contact</p>
              <h1 className="text-display-xl font-sans font-bold text-slate">
                Let&apos;s talk.
              </h1>
              <p className="mt-6 max-w-[36ch] font-serif text-body-lg text-slate-medium">
                Whether you need a product built, want to collaborate on research, or join
                the community — we&apos;d like to hear from you.
              </p>
              <div className="mt-10 flex flex-col gap-6">
                <div>
                  <p className="text-meta">Email</p>
                  <a
                    href="mailto:hello@rweru.com"
                    className="mt-1 inline-block font-sans text-lg font-medium link-underline"
                  >
                    hello@rweru.com
                  </a>
                </div>
                <div>
                  <p className="text-meta">Location</p>
                  <p className="mt-1 font-sans text-lg font-medium">Kigali, Rwanda</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form className="rounded-2xl bg-oat p-8 md:p-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      className="h-12 rounded-lg border border-slate/10 bg-ivory px-4 text-sm outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@organization.com"
                      className="h-12 rounded-lg border border-slate/10 bg-ivory px-4 text-sm outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
                    />
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <label htmlFor="interest" className="text-sm font-medium">
                    I&apos;m interested in
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    className="h-12 rounded-lg border border-slate/10 bg-ivory px-4 text-sm outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
                  >
                    <option>Software solutions</option>
                    <option>Research collaboration</option>
                    <option>Community / learning</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your project or question..."
                    className="resize-none rounded-lg border border-slate/10 bg-ivory p-4 text-sm outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
                  />
                </div>
                <button type="submit" className="btn-primary mt-8 w-full sm:w-auto">
                  Send message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
