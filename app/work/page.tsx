import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Selected work",
  description: "Selected software projects from RweruSynapse.",
};

export default function WorkPage() {
  redirect("/use-cases");
}
