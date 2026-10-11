import { NextResponse } from "next/server";
import { notifyPlaygroundLead } from "@/lib/notify";
import { buildProductPlan, planText, validAnswers } from "@/lib/playground";
import { allowRequest } from "@/lib/request-guard";

export const runtime = "nodejs";
const sources = [
  "product-quiz",
  "website-check",
  "estimator",
  "app-builder",
  "bingo",
  "ship-night",
  "tech-quiz",
  "masata-demo",
];

export async function POST(request: Request) {
  if (!allowRequest(request, "lead"))
    return NextResponse.json(
      { error: "Please wait a minute and try again." },
      { status: 429 },
    );
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }
  if (!body || typeof body !== "object")
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  if (body.website)
    return NextResponse.json(
      { error: "Please leave the website field empty." },
      { status: 400 },
    );
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const whatsapp =
    typeof body.whatsapp === "string" ? body.whatsapp.trim() : "";
  if (
    !name ||
    name.length > 100 ||
    email.length > 254 ||
    whatsapp.length > 30 ||
    (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
    (whatsapp && !/^\+[1-9]\d{7,14}$/.test(whatsapp.replace(/[\s()-]/g, ""))) ||
    (!email && !whatsapp)
  ) {
    return NextResponse.json(
      {
        error:
          "Enter your name and a valid email or WhatsApp number with country code (for example, +250…).",
      },
      { status: 400 },
    );
  }
  if (body.consent !== true || !sources.includes(body.source))
    return NextResponse.json(
      { error: "Please agree to be contacted about this project." },
      { status: 400 },
    );
  let summary =
    typeof body.summary === "string" ? body.summary.trim().slice(0, 6000) : "";
  if (body.source === "product-quiz") {
    if (!validAnswers(body.answers))
      return NextResponse.json(
        { error: "Please answer all five questions." },
        { status: 400 },
      );
    summary = planText(buildProductPlan(body.answers));
  }
  if (!summary)
    return NextResponse.json(
      { error: "Please complete the tool first." },
      { status: 400 },
    );
  // Never claim a lead was captured when no inbox delivery is configured.
  if (!process.env.RESEND_API_KEY)
    return NextResponse.json(
      {
        error:
          "The form is temporarily unavailable. Your result is still available below; contact us directly to discuss it.",
      },
      { status: 503 },
    );
  try {
    await notifyPlaygroundLead({
      name,
      email,
      whatsapp,
      source: body.source,
      summary,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "We could not send your details. Please retry or contact us directly.",
      },
      { status: 502 },
    );
  }
}
