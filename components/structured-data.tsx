import { brand, brandFaq, siteUrl } from "@/lib/brand";

const baseUrl = siteUrl;

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.company,
    alternateName: brand.short,
    url: baseUrl,
    logo: `${baseUrl}/icon`,
    description: brand.description,
    slogan: brand.tagline,
    contactPoint: {
      "@type": "ContactPoint",
      email: brand.email,
      contactType: "customer support",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
    areaServed: ["Rwanda", "Africa"],
    knowsAbout: [
      "Custom software development",
      "Applied AI research",
      "Digital platforms",
      "African technology community",
    ],
    sameAs: [brand.social.x, brand.social.linkedin, brand.social.instagram, brand.social.github],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * WebSite entity, separate from Organization, so search engines can
 * resolve "rweru", "RWERU", and "RweruSynapse" queries to this exact site.
 */
export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.company,
    alternateName: [brand.short, brand.mark],
    url: baseUrl,
    description: brand.metaDescription,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: brand.company,
      alternateName: brand.short,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** FAQPage structured data answering common "what is RWERU" brand queries. */
export function BrandFaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: brandFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type BreadcrumbJsonLdProps = {
  items: { name: string; href: string }[];
};

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type BlogPostingJsonLdProps = {
  post: {
    title: string;
    excerpt?: string;
    description?: string;
    date?: string;
    slug: string;
  };
};

export function BlogPostingJsonLd({ post }: BlogPostingJsonLdProps) {
  const organization = {
    "@type": "Organization",
    name: brand.company,
  };

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? post.description,
    datePublished: post.date,
    author: organization,
    publisher: organization,
    mainEntityOfPage: `${baseUrl}/blog/${post.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Service schema for RWERU Studio offerings — targets "custom software Rwanda" style queries. */
export function ServiceJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Custom software development",
    name: brand.studio,
    provider: {
      "@type": "Organization",
      name: brand.company,
      alternateName: brand.short,
    },
    areaServed: ["Rwanda", "Africa"],
    url: `${baseUrl}/solutions`,
    description:
      "RWERU Studio designs and ships custom software, platforms, and digital products for organizations across Rwanda and Africa.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type ProductJsonLdProps = {
  product: {
    name: string;
    description: string;
    href: string;
  };
};

/** SoftwareApplication schema for RWERU Products — targets product-name + "RWERU" queries. */
export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "BusinessApplication",
    description: product.description,
    url: product.href,
    brand: {
      "@type": "Brand",
      name: brand.short,
    },
    creator: {
      "@type": "Organization",
      name: brand.company,
      alternateName: brand.short,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type EventJsonLdProps = {
  event: {
    title: string;
    description: string;
    dateIso: string;
    location: string;
    slug: string;
  };
};

export function EventJsonLd({ event }: EventJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.dateIso,
    location: {
      "@type": "Place",
      name: event.location,
    },
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
