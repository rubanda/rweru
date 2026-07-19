/**
 * Centralized brand configuration.
 *
 * Brand architecture:
 * - Official company: RweruSynapse
 * - Short, public-facing brand: RWERU
 * - Compact visual mark: R/S
 * - RWERU Studio — client services (custom software & platforms)
 * - RWERU Labs — applied AI research & experiments
 * - RWERU Products — owned products, starting with Masata
 * - RWERU Community — learning, events, and community programs
 *
 * Import from here instead of hardcoding brand strings so copy stays
 * consistent across metadata, structured data, and UI components.
 */

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rweru.com";

export const brand = {
  /** Officially registered company name. Use for legal/formal contexts. */
  company: "RweruSynapse",
  /** Short, conversational public brand. Use in nav, headlines, casual copy. */
  short: "RWERU",
  /** Compact visual mark — icon-sized contexts only (favicon, avatar, seal). */
  mark: "R/S",
  tagline: "Software, AI and community—built in Rwanda for Africa.",
  description:
    "RweruSynapse is a Rwanda-based technology company building practical software, advancing applied AI, and growing Africa's next generation of builders.",
  metaTitle: "RweruSynapse | Software, AI and Community in Rwanda",
  metaDescription:
    "RweruSynapse builds practical software and AI products, delivers custom digital platforms, and supports a growing community of African builders.",
  studio: "RWERU Studio",
  labs: "RWERU Labs",
  products: "RWERU Products",
  community: "RWERU Community",
  email: "hello@rweru.com",
  location: "Kigali, Rwanda",
  social: {
    handle: "@rwerusynapse",
    x: "https://x.com/rwerusynapse",
    linkedin: "https://www.linkedin.com/company/rwerusynapse",
    instagram: "https://www.instagram.com/rwerusynapse",
    github: "https://github.com/rwerusynapse",
  },
} as const;

/** Masata attribution strings — use consistently wherever Masata is referenced. */
export const masata = {
  name: "Masata",
  byline: "Masata by RWERU",
  attribution: "Masata is a product of RweruSynapse.",
  href: "https://masata.app",
} as const;

export const socialLinks = [
  { label: "X", href: brand.social.x },
  { label: "LinkedIn", href: brand.social.linkedin },
  { label: "Instagram", href: brand.social.instagram },
  { label: "GitHub", href: brand.social.github },
];
