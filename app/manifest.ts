import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${brand.company} — ${brand.tagline}`,
    short_name: brand.short,
    description: brand.metaDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#eef2f6",
    theme_color: "#15202b",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/logo-crescent.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
