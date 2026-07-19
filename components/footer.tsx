import Link from "next/link";
import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";
import { brand, socialLinks } from "@/lib/brand";

const columns = [
  {
    title: "Products",
    links: [
      { href: "/products", label: "RWERU Products" },
      { href: "/products#masata", label: "Masata" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/solutions", label: "RWERU Studio" },
      { href: "/solutions#products", label: "Custom software" },
      { href: "/solutions#platforms", label: "Platforms" },
      { href: "/use-cases", label: "Client work" },
    ],
  },
  {
    title: "Research",
    links: [
      { href: "/research", label: "RWERU Labs" },
      { href: "/research#focus", label: "Focus areas" },
      { href: "/research#publications", label: "Writing" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/community", label: "RWERU Community" },
      { href: "/community#events", label: "Events" },
      { href: "/community#learn", label: "Learning paths" },
      { href: "/community#join", label: "Join" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/company", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-slate text-ivory">
      <div className="site-container section-y">
        <div className="flex flex-col gap-6 border-b border-ivory/10 pb-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-sans text-lg font-semibold text-ivory">
              Get build logs & event invites
            </h3>
            <p className="mt-1 max-w-[38ch] text-sm text-ivory/60">
              One email, roughly weekly — what we shipped, what we&apos;re researching, and
              what&apos;s next in the community.
            </p>
          </div>
          <div className="w-full max-w-sm">
            <NewsletterForm source="footer" tone="dark" />
          </div>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo tone="dark" />
            <p className="mt-4 max-w-[24ch] font-serif text-base leading-relaxed text-ivory/70">
              {brand.tagline}
            </p>
            <div className="mt-6 flex flex-col gap-1.5 text-sm text-ivory/60">
              <a href={`mailto:${brand.email}`} className="transition-colors hover:text-ivory">
                {brand.email}
              </a>
              <p>{brand.location}</p>
            </div>
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ivory/60 transition-colors hover:text-ivory"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-5">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <h3 className="text-sm font-medium text-ivory">{column.title}</h3>
                {column.links.map((link) => (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    className="text-sm text-ivory/60 transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-ivory/10 pt-6">
          <p className="text-meta text-cloud">
            © {new Date().getFullYear()} {brand.company}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
