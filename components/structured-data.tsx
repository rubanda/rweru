const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rweru.com";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RweruSynapse",
    url: baseUrl,
    logo: `${baseUrl}/favicon.ico`,
    description:
      "RweruSynapse builds software solutions for Rwanda and Africa — products, research, blogs, and a community where Africans learn and contribute.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@rweru.com",
      contactType: "customer support",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
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
    name: "RweruSynapse",
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
