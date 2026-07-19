import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Company",
  description:
    "About RweruSynapse — a Rwanda-based technology company building software, AI products, and community for Africa.",
  alternates: { canonical: "/company" },
  openGraph: {
    title: "Company | RweruSynapse",
    description:
      "About RweruSynapse — a Rwanda-based technology company building software, AI products, and community for Africa.",
    url: "/company",
  },
};

const values = [
  {
    number: "01",
    title: "Context first",
    body: "We design for real networks, devices, languages, and institutions — not for abstract markets.",
  },
  {
    number: "02",
    title: "Ship with care",
    body: "Reliable systems matter more than demos. We build for maintenance, security, and longevity.",
  },
  {
    number: "03",
    title: "Grow the ecosystem",
    body: "Every engagement should leave behind stronger local skill — through teaching and contribution.",
  },
];

export default function CompanyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="site-container section-y">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-meta mb-6">Company</p>
              <h1 className="text-display-xl font-sans font-bold text-slate">
                RweruSynapse is building Africa&apos;s technology capacity from Rwanda.
              </h1>
            </div>
            <div className="flex items-end lg:col-span-5">
              <p className="max-w-[40ch] font-serif text-body-lg text-slate-medium">
                We are a technology company headquartered in Kigali. Our work spans
                RWERU Studio client software, RWERU Products, RWERU Labs research, and
                RWERU Community — helping Africans learn and contribute.
              </p>
            </div>
          </div>
        </section>

        <section id="mission" className="border-t border-slate/10 bg-ivory">
          <div className="site-container section-y">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-display-s font-sans font-semibold">Our mission</h2>
              <p className="mt-8 font-serif text-body-lg leading-relaxed text-slate-medium">
                {brand.description}
              </p>
            </div>
          </div>
        </section>

        <section className="site-container section-y">
          <h2 className="text-display-s font-sans font-semibold">What we stand for</h2>
          <div className="mt-12 flex flex-col gap-0">
            {values.map((value) => (
              <div
                key={value.number}
                className="grid gap-4 border-t border-slate/10 py-10 md:grid-cols-12"
              >
                <span className="text-meta md:col-span-2">{value.number}</span>
                <h3 className="font-sans text-xl font-semibold md:col-span-3">
                  {value.title}
                </h3>
                <p className="max-w-[42ch] font-serif text-base leading-relaxed text-slate-medium md:col-span-7">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate text-ivory">
          <div className="site-container section-y flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-display-s font-sans font-semibold">
                Work with us
              </h2>
              <p className="mt-4 max-w-[36ch] font-serif text-lg text-ivory/70">
                Based in Kigali. Serving clients and collaborators across Africa.
              </p>
            </div>
            <Link href="/contact" className="btn-on-dark">
              Contact RweruSynapse
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
