import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rweru.com";

const privatePaths = ["/dashboard", "/login", "/api/dashboard"];

function allowPublic(userAgent: string) {
  return {
    userAgent,
    allow: "/" as const,
    disallow: privatePaths,
  };
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      allowPublic("*"),
      allowPublic("GPTBot"),
      allowPublic("ChatGPT-User"),
      allowPublic("Google-Extended"),
      allowPublic("PerplexityBot"),
      allowPublic("ClaudeBot"),
      allowPublic("anthropic-ai"),
      allowPublic("CCBot"),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
