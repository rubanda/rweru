import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the RweruSynapse community — a place for Africans to learn software, share research, and contribute.",
};

const pillars = [
  {
    title: "Learn",
    body: "Practical paths in product engineering, design systems, and shipping — written for African contexts.",
  },
  {
    title: "Contribute",
    body: "Open projects, docs, and research notes where contributors across the continent can make an impact.",
  },
  {
    title: "Connect",
    body: "Meet builders in Rwanda and beyond — mentorship, critique sessions, and collaborative builds.",
  },
];

export default function CommunityPage() {
  return (
    <>
      <Header />
      <main>
        <section className="site-container section-y">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-meta mb-6">Community</p>
              <h1 className="text-display-xl font-sans font-bold text-slate">
                A community for Africans to learn and contribute.
              </h1>
            </div>
            <div className="flex items-end lg:col-span-5">
              <p className="max-w-[40ch] font-serif text-body-lg text-slate-medium">
                Synapse Community brings together developers, designers, researchers, and
                founders — so talent across Africa can grow together and ship real work.
              </p>
            </div>
          </div>
        </section>

        <section id="learn" className="bg-slate text-ivory">
          <div className="site-container section-y text-center">
            <h2 className="text-cta-display mx-auto max-w-[16ch] font-serif">
              Learn in public. Build in public.
            </h2>
            <p className="mx-auto mt-8 max-w-[32ch] font-serif text-lg text-ivory/70">
              Workshops, writing, open source, and peer review — rooted in Kigali,
              open to the continent.
            </p>
            <Link href="/contact" className="btn-on-dark mt-10 inline-flex">
              Request an invite
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        <section id="contribute" className="site-container section-y">
          <div className="grid gap-8 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="border-t border-slate/10 pt-6">
                <h2 className="font-sans text-xl font-semibold">{pillar.title}</h2>
                <p className="mt-4 font-serif text-base leading-relaxed text-slate-medium">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-oat p-8 md:p-12">
            <h2 className="text-display-s font-sans font-semibold">
              How to get involved
            </h2>
            <ul className="mt-8 flex flex-col gap-0">
              {[
                { href: "/blog", label: "Read essays and tutorials on the blog" },
                { href: "/research", label: "Explore research notes and focus areas" },
                { href: "/contact", label: "Write to us to join or propose a session" },
              ].map((item) => (
                <li key={item.href} className="border-t border-slate/10">
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-4 py-5 font-sans text-lg font-medium hover:text-clay"
                  >
                    {item.label}
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
