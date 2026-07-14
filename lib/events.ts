export type EventFormat = "In-person" | "Virtual";
export type EventStatus = "Upcoming" | "Past";
export type EventType = "Workshop" | "Ship Night" | "Meetup" | "Learning";

export type CommunityEvent = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateIso: string;
  location: string;
  format: EventFormat;
  status: EventStatus;
  type: EventType;
  href: string;
  featured?: boolean;
};

export type LearningPath = {
  slug: string;
  title: string;
  description: string;
  sessions: number;
  href: string;
};

export const communityEvents: CommunityEvent[] = [
  {
    slug: "ship-night-kigali-aug",
    title: "Ship Night Kigali",
    description:
      "Bring a project, get unstuck with mentors, and ship something real before midnight — open to students and early-career builders.",
    date: "Aug 15, 2026",
    dateIso: "2026-08-15",
    location: "Kigali Innovation City",
    format: "In-person",
    status: "Upcoming",
    type: "Ship Night",
    href: "/contact?interest=Ship+Night+Kigali",
    featured: true,
  },
  {
    slug: "nextjs-starter-workshop",
    title: "Build your first Next.js site",
    description:
      "A hands-on workshop for beginners — go from zero to a live site using the stack we use at RweruSynapse.",
    date: "Aug 29, 2026",
    dateIso: "2026-08-29",
    location: "Kigali · Hybrid",
    format: "In-person",
    status: "Upcoming",
    type: "Workshop",
    href: "/contact?interest=Next.js+Workshop",
  },
  {
    slug: "portfolio-critique",
    title: "Portfolio & GitHub critique",
    description:
      "Get live feedback on your portfolio, resume, and GitHub — tailored for youth entering tech in Rwanda.",
    date: "Sep 12, 2026",
    dateIso: "2026-09-12",
    location: "Online",
    format: "Virtual",
    status: "Upcoming",
    type: "Meetup",
    href: "/contact?interest=Portfolio+Critique",
  },
  {
    slug: "open-source-saturday",
    title: "Open Source Saturday",
    description:
      "Contribute to community docs and starter kits. Leave with your first meaningful PR.",
    date: "Sep 26, 2026",
    dateIso: "2026-09-26",
    location: "Kigali",
    format: "In-person",
    status: "Upcoming",
    type: "Learning",
    href: "/contact?interest=Open+Source+Saturday",
  },
  {
    slug: "intro-to-product",
    title: "Intro to product thinking",
    description:
      "Learn how we turn real African problems into software — from research to first release.",
    date: "Jun 20, 2026",
    dateIso: "2026-06-20",
    location: "Online",
    format: "Virtual",
    status: "Past",
    type: "Learning",
    href: "/blog/shipping-software-in-africa",
  },
  {
    slug: "ship-night-july",
    title: "Ship Night · July edition",
    description:
      "Our monthly build night for students and junior developers in Kigali.",
    date: "Jul 11, 2026",
    dateIso: "2026-07-11",
    location: "Kigali",
    format: "In-person",
    status: "Past",
    type: "Ship Night",
    href: "/blog/opening-synapse-community",
  },
];

export const learningPaths: LearningPath[] = [
  {
    slug: "web-fundamentals",
    title: "Web fundamentals for African builders",
    description: "HTML, CSS, and modern React — practical projects you can show employers.",
    sessions: 4,
    href: "/blog",
  },
  {
    slug: "ship-with-nextjs",
    title: "Ship with Next.js",
    description: "From local app to production deploy — the stack behind our client work.",
    sessions: 3,
    href: "/blog/shipping-software-in-africa",
  },
  {
    slug: "contribute-open",
    title: "Contribute in the open",
    description: "Docs, issues, and pull requests — how to join real projects with confidence.",
    sessions: 2,
    href: "/community#events",
  },
];

export const eventFilterOptions = {
  format: ["In-person", "Virtual"] as EventFormat[],
  status: ["Upcoming", "Past"] as EventStatus[],
  type: ["Workshop", "Ship Night", "Meetup", "Learning"] as EventType[],
};
