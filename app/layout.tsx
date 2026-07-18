import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Sans, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { OrganizationJsonLd } from "@/components/structured-data";
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

const siteTitle = "RweruSynapse | Software for Rwanda and Africa";
const siteDescription =
  "RweruSynapse builds software solutions for Rwanda and Africa — products, research, blogs, and a community where Africans learn and contribute.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://rweru.com"),
  title: {
    default: siteTitle,
    template: "%s | RweruSynapse",
  },
  description: siteDescription,
  keywords: [
    "RweruSynapse",
    "RWERUSYNAPSE",
    "Software Development",
    "Rwanda",
    "Africa",
    "Kigali",
    "Tech Community",
    "Research",
    "Web Development",
    "Digital Transformation",
  ],
  openGraph: {
    type: "website",
    siteName: "RweruSynapse",
    locale: "en_US",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  alternates: {
    canonical: "/",
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
