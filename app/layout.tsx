import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Sans, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/structured-data";
import { brand, siteUrl } from "@/lib/brand";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: brand.metaTitle,
    template: `%s | ${brand.company}`,
  },
  description: brand.metaDescription,
  applicationName: brand.company,
  keywords: [
    "RweruSynapse",
    "RWERU",
    "RWERU Studio",
    "RWERU Labs",
    "RWERU Products",
    "RWERU Community",
    "Software",
    "Applied AI",
    "Rwanda",
    "Africa",
    "Kigali",
    "Tech Community",
    "Custom Software",
    "Digital Platforms",
  ],
  openGraph: {
    type: "website",
    siteName: brand.company,
    locale: "en_US",
    title: brand.metaTitle,
    description: brand.metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: brand.social.handle,
    creator: brand.social.handle,
    title: brand.metaTitle,
    description: brand.metaDescription,
  },
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {children}
        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
