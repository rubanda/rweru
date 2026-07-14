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
  },
  {
    slug: "opening-synapse-community",
    title: "Opening the Synapse Community",
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
  },
];
