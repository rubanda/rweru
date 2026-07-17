import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { notifyRsvp } from "@/lib/notify";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RsvpRole = "attendee" | "volunteer";

type RsvpBody = {
  eventSlug?: unknown;
  name?: unknown;
  email?: unknown;
  role?: unknown;
};

function isRsvpRole(value: unknown): value is RsvpRole {
  return value === "attendee" || value === "volunteer";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RsvpBody;
    const eventSlug = typeof body.eventSlug === "string" ? body.eventSlug.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const role = body.role;

    if (!eventSlug) {
      return NextResponse.json({ ok: false, error: "Missing event." }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!isRsvpRole(role)) {
      return NextResponse.json({ ok: false, error: "Please choose a role." }, { status: 400 });
    }

    const dataDir = path.join(process.cwd(), "data");
    fs.mkdirSync(dataDir, { recursive: true });

    const record = {
      eventSlug,
      name,
      email,
      role,
      submittedAt: new Date().toISOString(),
    };

    fs.appendFileSync(path.join(dataDir, "rsvps.jsonl"), `${JSON.stringify(record)}\n`);

    try {
      await notifyRsvp({ eventSlug, name, email, role });
    } catch (notifyError) {
      console.error("[rsvp] notifyRsvp failed:", notifyError);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[rsvp] Unexpected error:", error);
    return NextResponse.json({ ok: false, error: "Something went wrong" }, { status: 500 });
  }
}
