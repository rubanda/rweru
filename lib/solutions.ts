export type Offering = {
  title: string;
  body: string;
};

/** RWERU Studio service offerings — shared between the homepage teaser and /solutions. */
export const studioOfferings: Offering[] = [
  {
    title: "Custom software",
    body: "Web and mobile products engineered for reliability — from MVP to production scale.",
  },
  {
    title: "Platforms & SaaS",
    body: "Multi-tenant systems for operations, content, community, and internal tools.",
  },
  {
    title: "Product design",
    body: "Research-led UX that respects local workflows, languages, and device realities.",
  },
  {
    title: "Engineering partnership",
    body: "Embedded teams that ship with your organization — architecture, delivery, and mentorship.",
  },
];
