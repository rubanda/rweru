import { masata } from "@/lib/brand";

export type Product = {
  slug: string;
  name: string;
  byline: string;
  tagline: string;
  description: string;
  href: string;
  status: "Live" | "Coming soon";
  category: string;
};

/**
 * Products owned and operated by RweruSynapse — distinct from custom
 * software built for clients (see lib/use-cases.ts) and RWERU Labs
 * experiments (see app/research).
 */
export const products: Product[] = [
  {
    slug: "masata",
    name: masata.name,
    byline: masata.byline,
    tagline: "Church and ministry operations platform",
    description:
      "A multi-tenant platform that helps churches and ministries manage members, content, and events from one place. Masata already powers New Jerusalem Church's Rwanda and Luxembourg sites side by side.",
    href: masata.href,
    status: "Live",
    category: "Platform",
  },
];

export const upcomingProducts = [
  {
    name: "New products",
    description:
      "We're building more tools out of what we learn shipping client platforms and running RWERU Labs. Nothing to announce yet — join the community or newsletter to hear first.",
  },
];
