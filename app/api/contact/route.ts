import { NextResponse } from "next/server";
import { notifyContact } from "@/lib/notify";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INTERESTS = [
  "Software solutions (RWERU Studio)",
  "Products (RWERU Products / Masata)",
  "Research collaboration (RWERU Labs)",
  "Community / learning",
  "Other",
] as const;

type ContactBody = {
  name?: unknown;
  email?: unknown;
  interest?: unknown;
  message?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const interest = typeof body.interest === "string" ? body.interest.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name) {
      return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (!INTERESTS.includes(interest as (typeof INTERESTS)[number])) {
      return NextResponse.json(
        { ok: false, error: "Please choose what you're interested in." },
        { status: 400 },
      );
    }

    if (!message) {
      return NextResponse.json(
        { ok: false, error: "Please enter a message." },
        { status: 400 },
      );
    }

    try {
      await notifyContact({ name, email, interest, message });
    } catch (notifyError) {
      console.error("[contact] notifyContact failed:", notifyError);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
