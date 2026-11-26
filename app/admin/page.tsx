import type { Metadata } from "next";
import { CardStudio } from "./card-studio";

export const metadata: Metadata = {
  title: "Executive Business Card Studio",
  description:
    "Internal RweruSynapse print identity and business card designer.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function AdminPage() {
  return <CardStudio />;
}
