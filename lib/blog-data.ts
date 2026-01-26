
export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    author: {
        name: string;
        role: string;
        avatar: string; // URL to avatar image
    };
    date: string;
    category: string;
    image: string; // URL to cover image
};

export const blogPosts: BlogPost[] = [
    {
        slug: "modern-systems-development",
        title: "The Future of Modern Systems Development",
        excerpt: "TL;DR: How microservices, serverless, and edge computing are reshaping the way we build scalable backends.",
        author: {
            name: "Alex Rivera",
            role: "Senior Systems Engineer",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        },
        date: "Oct 24, 2025",
        category: "Systems",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop",
    },
    {
        slug: "building-robust-frameworks",
        title: "Principles for Building Robust Frameworks",
        excerpt: "TL;DR: A deep dive into API design, developer experience, and maintaining backward compatibility when building internal tools.",
        author: {
            name: "Sarah Chen",
            role: "Lead Architect",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        },
        date: "Nov 12, 2025",
        category: "Frameworks",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2000&auto=format&fit=crop",
    },
    {
        slug: "mobile-app-tips",
        title: "Essential Tips for High-Performance Mobile Apps",
        excerpt: "TL;DR: focusing on offline-first architecture, effective state management, and optimizing assets for sub-second load times.",
        author: {
            name: "Jordan Lee",
            role: "Mobile Developer",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
        },
        date: "Dec 05, 2025",
        category: "App Building",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000&auto=format&fit=crop",
    },
    {
        slug: "nextjs-scaling",
        title: "Scaling Next.js Applications for the Enterprise",
        excerpt: "TL;DR: Strategies for caching, ISR, and optimizing Vercel deployments to handle millions of requests without breaking a sweat.",
        author: {
            name: "Mike Ross",
            role: "Frontend Lead",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        },
        date: "Jan 15, 2026",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop",
    },
    {
        slug: "database-design-patterns",
        title: "Database Design Patterns for 2026",
        excerpt: "TL;DR: moving beyond simple CRUD. Exploring event sourcing, polymorphy, and time-series data handling in modern Postgres.",
        author: {
            name: "Emily Davis",
            role: "Data Scientist",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        },
        date: "Jan 20, 2026",
        category: "Data",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2000&auto=format&fit=crop",
    },
];
