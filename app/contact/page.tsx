import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { brand } from "@/lib/brand";
import { BreadcrumbJsonLd } from "@/components/structured-data";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with RweruSynapse — software, AI, and community from Kigali, Rwanda.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | RweruSynapse",
    description: "Get in touch with RweruSynapse — software, AI, and community from Kigali, Rwanda.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      <main>
        <section className="site-container section-y">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-meta mb-6">Contact</p>
              <h1 className="text-display-xl font-sans font-bold text-slate">
                Let&apos;s talk.
              </h1>
              <p className="mt-6 max-w-[36ch] font-serif text-body-lg text-slate-medium">
                Whether you need software built, want to collaborate on research, or join
                the community — we&apos;d like to hear from you.
              </p>
              <div className="mt-10 flex flex-col gap-6">
                <div>
                  <p className="text-meta">Email</p>
                  <a
                    href={`mailto:${brand.email}`}
                    className="mt-1 inline-block font-sans text-lg font-medium link-underline"
                  >
                    {brand.email}
                  </a>
                </div>
                <div>
                  <p className="text-meta">Location</p>
                  <p className="mt-1 font-sans text-lg font-medium">{brand.location}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
