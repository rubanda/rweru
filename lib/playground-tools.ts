export const playgroundCategories = [
  {
    id: "business",
    label: "For your business",
    description: "A clearer idea of what to build, and where to start.",
  },
  {
    id: "play",
    label: "Just for fun",
    description: "A quick challenge. A little local flavour. Your turn.",
  },
  {
    id: "demo",
    label: "Try a product",
    description: "Take a look inside something we build.",
  },
] as const;

export type PlaygroundCategory = (typeof playgroundCategories)[number]["id"];

export const playgroundTools = [
  {
    slug: "product-quiz",
    category: "business",
    title: "Find your first build",
    description:
      "Five questions to turn your business idea into a practical starter product plan.",
    duration: "1 minute",
    action: "Find my starting point",
    featured: true,
  },
  {
    slug: "website-check",
    category: "business",
    title: "Check your website",
    description:
      "See how your site performs on mobile and how easy it is to reach you.",
    duration: "About a minute",
    action: "Check my site",
    featured: false,
  },
  {
    slug: "estimator",
    category: "business",
    title: "Size up your idea",
    description:
      "Pick your pages and features for a rough first-version build timeline.",
    duration: "30 seconds",
    action: "Estimate my timeline",
    featured: false,
  },
  {
    slug: "app-builder",
    category: "business",
    title: "Sketch your app",
    description:
      "Choose a business and arrange blocks to see your idea on a phone.",
    duration: "1 minute",
    action: "Build a tiny app",
    featured: false,
  },
  {
    slug: "bingo",
    category: "play",
    title: "Business bingo",
    description:
      "Notebooks, screenshots, endless chats. How many sound familiar?",
    duration: "30 seconds",
    action: "Play bingo",
    featured: false,
  },
  {
    slug: "ship-night",
    category: "play",
    title: "Ship Night",
    description: "Catch the bugs, beat your best score, and ship that feature.",
    duration: "20 seconds",
    action: "Catch some bugs",
    featured: false,
  },
  {
    slug: "tech-quiz",
    category: "play",
    title: "Tech in Kinyarwanda",
    description:
      "Five everyday tech words. Learn a little, then challenge a friend.",
    duration: "1 minute",
    action: "Test my knowledge",
    featured: false,
  },
  {
    slug: "masata-demo",
    category: "demo",
    title: "A look inside Masata",
    description:
      "Meet the members, try an event, and explore a sample church dashboard.",
    duration: "At your own pace",
    action: "Explore the demo",
    featured: false,
  },
] as const;

export type PlaygroundTool = (typeof playgroundTools)[number];
export type PlaygroundToolSlug = PlaygroundTool["slug"];

export function getPlaygroundTool(slug: string) {
  return playgroundTools.find((tool) => tool.slug === slug);
}

export function playgroundToolHref(slug: string) {
  return getPlaygroundTool(slug) ? `/playground/${slug}` : "/playground";
}
