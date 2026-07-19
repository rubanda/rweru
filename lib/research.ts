export type FocusArea = {
  title: string;
  body: string;
};

/** RWERU Labs focus areas — shared between the homepage teaser and /research. */
export const labsFocusAreas: FocusArea[] = [
  {
    title: "Applied AI",
    body: "Early-stage experiments applying AI to real workflows from our client and product work. This is a forming focus area — expect honest 'in progress' notes before polished results.",
  },
  {
    title: "Digital infrastructure",
    body: "Connectivity, payments, identity, and platforms that work under real African constraints.",
  },
  {
    title: "Product systems",
    body: "Architecture patterns for reliable web and mobile products serving growing markets.",
  },
  {
    title: "Learning & talent",
    body: "How communities learn to ship — curricula, open contribution, and apprenticeship models.",
  },
];
