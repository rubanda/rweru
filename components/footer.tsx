import Link from "next/link";
import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";

const columns = [
  {
    title: "Solutions",
    links: [
      { href: "/solutions", label: "Overview" },
      { href: "/solutions#products", label: "Custom software" },
      { href: "/solutions#platforms", label: "Platforms" },
      { href: "/use-cases", label: "Use cases" },
    ],
  },
  {
    title: "Research",
    links: [
      { href: "/research", label: "Overview" },
      { href: "/research#focus", label: "Focus areas" },
      { href: "/research#publications", label: "Publications" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/community", label: "Community" },
      { href: "/community#events", label: "Events" },
      { href: "/community#learn", label: "Learning paths" },
      { href: "/community#join", label: "Join" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/company", label: "About" },
      { href: "/company#mission", label: "Mission" },
      { href: "/contact", label: "Contact" },
      { href: "/blog", label: "News" },
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
            <p className="mt-4 max-w-[22ch] font-serif text-base leading-relaxed text-ivory/70">
              Software, research, and community — built in Rwanda for Africa.
            </p>
            <p className="mt-8 text-meta text-cloud">
              © {new Date().getFullYear()} RweruSynapse
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-9">
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
      </div>
    </footer>
  );
}
