export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  category: string;
  image: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "shipping-software-in-africa",
    title: "How African teams can ship production software faster",
    excerpt:
      "Practical patterns for delivery when bandwidth, payments, and talent markets look different from Silicon Valley defaults.",
    author: {
      name: "RweruSynapse Team",
      role: "Engineering",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rweru",
    },
    date: "Jul 10, 2026",
    category: "Engineering",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop",
    sections: [
      {
        heading: "Delivery habits that survive real infrastructure",
        paragraphs: [
          "Most engineering advice assumes always-on broadband, unlimited cloud budgets, and a large bench of specialists to call on. Teams shipping software in Rwanda and across Africa rarely have all three at once — so the habits that make delivery reliable here look a little different.",
          "The biggest lever isn't a framework choice. It's designing for degraded conditions from day one: assume a request will time out, assume a payment will fail silently, assume a user's session will drop mid-form. Build the retry, the draft-save, and the offline queue before you need them, not after a client reports data loss.",
        ],
      },
      {
        heading: "Where we spend our engineering time",
        paragraphs: [
          "On projects like Masata, the platform behind several church operations sites we run, most of our time doesn't go into new features — it goes into making the boring parts (auth, sync, background jobs) boring enough that they don't wake anyone up at 2am. That discipline is what lets one small team support multiple live tenants at once.",
          "Small teams also mean fewer handoffs. We keep design, engineering, and client communication close together so decisions ship the same week they're made, instead of waiting on a queue of approvals that assumes a much larger organization.",
        ],
      },
      {
        heading: "What this means for the people we build for",
        paragraphs: [
          "For a hotel booking flow or a church's event calendar, this translates into something simple: the product keeps working when the network doesn't cooperate, and it doesn't require a big team on the client's side to keep it running.",
        ],
      },
    ],
  },
  {
    slug: "connectivity-aware-design",
    title: "Connectivity-aware product design",
    excerpt:
      "Designing interfaces and architectures that stay useful on intermittent networks across Rwanda and the region.",
    author: {
      name: "RweruSynapse Team",
      role: "Product Research",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Design",
    },
    date: "Jun 18, 2026",
    category: "Research",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop",
    sections: [
      {
        heading: "Connectivity is a design constraint, not an edge case",
        paragraphs: [
          "Design systems built for uninterrupted broadband treat a dropped connection as an error state — a toast, a red banner, maybe a retry button. In markets where mobile data is metered and coverage is uneven, that connection drop isn't rare. It's a normal part of using the product.",
          "That changes the default: instead of designing the 'happy path' first and bolting on error handling later, we design the interrupted path first. What does this screen look like mid-sync? What can a user still do with cached data? What's the smallest unit of work that can be saved locally before it's confirmed by a server?",
        ],
      },
      {
        heading: "Practical patterns we reach for",
        paragraphs: [
          "Optimistic UI with clear rollback, so an action feels instant but never lies about its real state. Aggressive caching of anything that doesn't change often — content, event listings, catalog data. And payload discipline: shipping less JavaScript and fewer, smaller images matters more on a throttled connection than almost any other performance decision.",
        ],
      },
      {
        heading: "Why this matters beyond performance scores",
        paragraphs: [
          "A booking site that fails silently on a weak signal doesn't just feel slow — it loses the booking. Connectivity-aware design is ultimately a trust decision: it tells users the product was actually built with their conditions in mind, not adapted from somewhere else as an afterthought.",
        ],
      },
    ],
  },
  {
    slug: "multilingual-african-products",
    title: "Building for multilingual African audiences",
    excerpt:
      "Language, tone, and UI structure when your users speak Kinyarwanda, French, English, Swahili — often in the same session.",
    author: {
      name: "RweruSynapse Team",
      role: "Design",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lang",
    },
    date: "May 22, 2026",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
    sections: [
      {
        heading: "One user, several languages, one session",
        paragraphs: [
          "In Rwanda alone, a single user might read Kinyarwanda at home, French at church, and English at work — sometimes switching between them within the same conversation. Products designed around a single default locale miss how naturally people here move between languages.",
          "That means language switching needs to be cheap and visible, not buried three menus deep in a settings screen. It also means copy has to be written to translate cleanly — short sentences, concrete verbs, minimal idiom — rather than adapted awkwardly after the fact.",
        ],
      },
      {
        heading: "Tone matters as much as translation",
        paragraphs: [
          "A literal translation can still feel foreign if the tone doesn't match how people actually communicate — more formal in some contexts, warmer and more personal in others. On church and ministry sites we've built, the register of the language matters as much as its accuracy: a stiff, corporate tone reads as untrustworthy in a context where community trust is everything.",
        ],
      },
      {
        heading: "Structural decisions, not just strings",
        paragraphs: [
          "Multilingual support isn't only a translation table. Layouts need to accommodate text that expands or contracts across languages, forms need labels that don't assume Latin-only input, and content models need a 'no translation yet' state that degrades gracefully instead of showing broken placeholders.",
        ],
      },
    ],
  },
  {
    slug: "opening-synapse-community",
    title: "Opening the RWERU Community",
    excerpt:
      "Why we are building a place for Africans to learn software together — and how you can contribute from day one.",
    author: {
      name: "RweruSynapse Team",
      role: "Community",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Community",
    },
    date: "May 05, 2026",
    category: "Community",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2000&auto=format&fit=crop",
    sections: [
      {
        heading: "Why we're building this in the open",
        paragraphs: [
          "We didn't start RweruSynapse to only ship client work quietly. Every project we build teaches us something about African infrastructure, users, and constraints — and we think that knowledge is more useful shared than kept internal. RWERU Community exists to pass that on directly, through workshops, ship nights, and open contribution, rather than through occasional conference talks.",
        ],
      },
      {
        heading: "What 'contribute from day one' actually means",
        paragraphs: [
          "You don't need a portfolio or a job title to show up. Ship nights are built for people bringing a half-finished side project as much as for people mentoring others through one. Learning paths start from web fundamentals and build toward shipping real, deployed work — the same stack we use on client projects.",
          "We're deliberately keeping the on-ramp low: RSVP to an event, show up, and the first ask is simply to participate. The path from attendee to volunteer to running your own session is one we want people to walk at their own pace, not one gated behind an application process.",
        ],
      },
      {
        heading: "Where this goes next",
        paragraphs: [
          "As the community grows, we want more of the events, curricula, and even the platforms we build to be shaped by the people who show up to them — not just planned top-down from RweruSynapse. If you want to help build that, the community page is the place to start.",
        ],
      },
    ],
  },
  {
    slug: "platforms-for-african-organizations",
    title: "Platforms that grow with African organizations",
    excerpt:
      "Lessons from building multi-tenant systems for non-profits, churches, farms, and operators who need to scale carefully.",
    author: {
      name: "RweruSynapse Team",
      role: "Platforms",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Platform",
    },
    date: "Apr 12, 2026",
    category: "Solutions",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    sections: [
      {
        heading: "Why we built Masata as multi-tenant from the start",
        paragraphs: [
          "New Jerusalem Church needed a website in Rwanda, then a second one in Luxembourg, connected but independently manageable. Building each as a one-off site would have meant maintaining two codebases for the same underlying needs — members, content, events. Instead, Masata was built as a single multi-tenant platform: shared infrastructure, independent branches.",
        ],
      },
      {
        heading: "Scaling carefully, not quickly",
        paragraphs: [
          "Non-profits, churches, and small operators rarely need to scale to millions of users — they need to scale to a handful of new branches, locations, or programs without a full rebuild each time. That's a different engineering problem than typical startup scaling, and it shapes different decisions: simpler tenancy models, clearer admin tooling for non-technical staff, and a bias toward stability over adding features nobody asked for.",
        ],
      },
      {
        heading: "What we look for before building a platform, not a site",
        paragraphs: [
          "The signal is usually structural: more than one branch, chapter, or location that will eventually need the same tool; a non-technical team that needs to self-serve content updates; and a plan to grow deliberately rather than react to sudden scale. When those are present, investing in a shared platform pays off within the second or third deployment — which is exactly what happened moving from New Jerusalem Church Rwanda to its Luxembourg branch.",
        ],
      },
    ],
  },
];
