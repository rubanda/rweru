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
  metaTitle: "RweruSynapse (RWERU) | Software, AI and Community in Rwanda",
  metaDescription:
    "RweruSynapse (RWERU) builds practical software and AI products, delivers custom digital platforms, and supports a growing community of African builders from Kigali, Rwanda.",
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

/**
 * Canonical answers to brand-identity questions — reused in FAQ structured
 * data and on the Company page so search engines have one consistent,
 * quotable source for "what is RWERU" style queries.
 */
export const brandFaq = [
  {
    question: "What is RWERU?",
    answer:
      "RWERU is the short, public-facing brand of RweruSynapse — a technology company based in Kigali, Rwanda that builds practical software, advances applied AI, and supports a community of African builders.",
  },
  {
    question: "What does RWERU stand for?",
    answer:
      "RWERU is the short brand name for RweruSynapse, the company's official registered name. RWERU is used in everyday conversation, product names, and social media; RweruSynapse is used in formal and legal contexts.",
  },
  {
    question: "Is RWERU the same company as RweruSynapse?",
    answer:
      "Yes. RweruSynapse is the official company name, and RWERU is its short brand — the same organization, used interchangeably depending on context.",
  },
  {
    question: "What does RweruSynapse build?",
    answer:
      "RweruSynapse builds RWERU Products (starting with Masata), delivers custom software and platforms for clients through RWERU Studio, conducts applied research and AI experiments through RWERU Labs, and runs RWERU Community for African developers, founders, students, and creators.",
  },
  {
    question: "Is Masata part of RWERU?",
    answer:
      "Yes. Masata is a product of RweruSynapse, built and operated under the RWERU Products line — often referred to as \"Masata by RWERU.\"",
  },
] as const;
