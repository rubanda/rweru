import type { Metadata } from "next";
import { Instrument_Sans, Source_Serif_4, JetBrains_Mono } from "next/font/google";
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
  title: {
    default: "RweruSynapse | Software for Rwanda and Africa",
    template: "%s | RweruSynapse",
  },
  description:
    "RweruSynapse builds software solutions for Rwanda and Africa — products, research, blogs, and a community where Africans learn and contribute.",
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
};

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
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
