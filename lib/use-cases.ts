export type UseCase = {
  slug: string;
  title: string;
  description: string;
  challenge: string;
  outcome: string;
  href: string;
  image: string;
  author: string;
  category: string;
  product: string;
  features: string[];
  location: string;
  poweredBy?: string;
};

export const useCases: UseCase[] = [
  {
    slug: "masata",
    title: "Masata — church and ministry operations platform",
    description:
      "A multi-tenant application that helps churches manage members, content, events, and connected websites from one place. Powers New Jerusalem Church sites across Rwanda and Luxembourg.",
    challenge:
      "Multiple church branches across two countries were running on disconnected tools for members, content, and events — with no shared system between them.",
    outcome:
      "One multi-tenant platform now runs New Jerusalem Church's Rwanda and Luxembourg sites side by side, with a single codebase we maintain and extend for every new branch.",
    href: "https://masata.app",
    image: "/work/masata.jpg",
    author: "RweruSynapse",
    category: "Platform",
    product: "Masata",
    features: ["SaaS", "Multi-tenant", "Operations"],
    location: "Africa & Europe",
  },
  {
    slug: "ibara",
    title: "Ibara — Rwanda, told through art",
    description:
      "A marketplace for authentic art, crafts, and gifts from verified Rwandan creators — buy online, receive it at a hotel in Kigali, or ship it home.",
    challenge:
      "Travellers and collectors had no trusted way to buy original Rwandan work from verified artists, or to receive it before they left the country.",
    outcome:
      "A live marketplace where verified creators sell directly, visitors can take Rwanda home, and artists keep up to 92% of each sale.",
    href: "https://ibara.rw",
    image: "/work/ibara.jpg",
    author: "RweruSynapse",
    category: "Marketplace",
    product: "Website",
    features: ["E-commerce", "Art", "Rwanda"],
    location: "Kigali, Rwanda",
  },
  {
    slug: "zmk",
    title: "ZMK Group — engineering tomorrow",
    description:
      "Corporate website for a Kigali group spanning energy, technical systems, events, and a creative studio — four specialist divisions, one accountable partner.",
    challenge:
      "Four specialist practices needed one credible public home that could explain the group without flattening each division into a generic company page.",
    outcome:
      "A single site that presents ZMK as one partner across energy, engineering, events, and media, with a clear path to start a project.",
    href: "https://zmk.rw",
    image: "/work/zmk.jpg",
    author: "RweruSynapse",
    category: "Corporate",
    product: "Website",
    features: ["Energy", "Events", "Rwanda"],
    location: "Kigali, Rwanda",
  },
  {
    slug: "njc-rwanda",
    title: "New Jerusalem Church Rwanda",
    description:
      "The official website for New Jerusalem Church in Rwanda — sermons, events, and community presence, powered by Masata.",
    challenge:
      "The church needed a public home for sermons and events that its own staff could update without touching code.",
    outcome:
      "A Masata-powered site the church team updates directly — sermons, events, and announcements go live without a developer in the loop.",
    href: "https://njc.org.rw",
    image: "/work/njc-rwanda.jpg",
    author: "RweruSynapse",
    category: "Church",
    product: "Website",
    features: ["Content", "Events", "Masata"],
    location: "Kigali, Rwanda",
    poweredBy: "Masata",
  },
  {
    slug: "eza-hotel",
    title: "Eza Hotel — book stays in Rwanda",
    description:
      "A hospitality website for Eza Hotel where guests can discover rooms, amenities, and book their stay online.",
    challenge:
      "Guests had no way to see rooms and amenities or request a stay online — every booking depended on a phone call.",
    outcome:
      "A booking-ready website guests can browse and reserve from directly, giving the hotel a digital front door that works around the clock.",
    href: "https://www.eza.rw",
    image: "/work/eza-hotel.jpg",
    author: "RweruSynapse",
    category: "Hospitality",
    product: "Website",
    features: ["Booking", "Hotel", "Rwanda"],
    location: "Rwanda",
  },
  {
    slug: "jfountain-mission",
    title: "jFountain Mission",
    description:
      "Website for a non-profit organization and church in Uganda — outreach, community engagement, and ministry presence online.",
    challenge:
      "A growing mission in Uganda had no online presence to reach supporters and communicate its outreach work.",
    outcome:
      "A public website that gives the mission a credible home online for outreach, updates, and community engagement.",
    href: "https://www.jfountainmission.org",
    image: "/work/jfountain-mission.jpg",
    author: "RweruSynapse",
    category: "Non-profit",
    product: "Website",
    features: ["Church", "Outreach", "Uganda"],
    location: "Uganda",
  },
  {
    slug: "njc-luxembourg",
    title: "New Jerusalem Church Luxembourg",
    description:
      "Branch website for New Jerusalem Church in Luxembourg, connected to the Masata platform for content and events.",
    challenge:
      "As the church expanded to Luxembourg, the branch needed its own site without starting from scratch or duplicating infrastructure.",
    outcome:
      "The Luxembourg branch launched on the same Masata platform as the Rwanda site — new branch, shared infrastructure, days not months to go live.",
    href: "https://www.newjerusalem.lu",
    image: "/work/njc-lux.jpg",
    author: "RweruSynapse",
    category: "Church",
    product: "Website",
    features: ["Content", "Events", "Masata"],
    location: "Luxembourg",
    poweredBy: "Masata",
  },
  {
    slug: "rubanda-jacques",
    title: "Rubanda Jacques",
    description:
      "Personal site for the senior pastor of New Jerusalem Church — teaching, biography, and ministry presence.",
    challenge:
      "A public figure needed a personal, professional site separate from the church's own presence to house his teaching and biography.",
    outcome:
      "A standalone personal site that gives his ministry work a durable, dedicated home online.",
    href: "https://www.rubandajacques.org",
    image: "/work/rubanda-jacques.jpg",
    author: "RweruSynapse",
    category: "Ministry",
    product: "Website",
    features: ["Portfolio", "Biography"],
    location: "Rwanda",
  },
];

export const filterOptions = {
  category: Array.from(new Set(useCases.map((item) => item.category))).sort(),
  features: Array.from(new Set(useCases.flatMap((item) => item.features))).sort(),
  product: Array.from(new Set(useCases.map((item) => item.product))).sort(),
};
