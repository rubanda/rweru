import { brand } from "@/lib/brand";

const inbox = process.env.CONTACT_TO_EMAIL ?? brand.email;

type RsvpNotifyPayload = {
  eventSlug: string;
  name: string;
  email: string;
  role: string;
};

type ContactNotifyPayload = {
  name: string;
  email: string;
  interest: string;
  message: string;
};

async function sendEmail({
  to,
  subject,
  text,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[notify] email skipped (no RESEND_API_KEY set):", {
      to,
      subject,
      text,
    });
    return;
  }

  const from = process.env.RESEND_FROM_EMAIL ?? "RweruSynapse <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend request failed (${response.status}): ${detail}`);
  }
}

export async function notifyRsvp(payload: RsvpNotifyPayload) {
  const subject = `New ${payload.role} RSVP: ${payload.eventSlug}`;
  const text = `New RSVP received.\n\nEvent: ${payload.eventSlug}\nRole: ${payload.role}\nName: ${payload.name}\nEmail: ${payload.email}`;
  const html = `<p>New RSVP received.</p><ul><li><strong>Event:</strong> ${payload.eventSlug}</li><li><strong>Role:</strong> ${payload.role}</li><li><strong>Name:</strong> ${payload.name}</li><li><strong>Email:</strong> ${payload.email}</li></ul>`;

  await sendEmail({
    to: inbox,
    subject,
    text,
    html,
    replyTo: payload.email,
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function notifyContact(payload: ContactNotifyPayload) {
  const subject = `Contact: ${payload.interest} — ${payload.name}`;
  const text = `New contact message.\n\nName: ${payload.name}\nEmail: ${payload.email}\nInterest: ${payload.interest}\n\n${payload.message}`;
  const html = `<p>New contact message.</p><ul><li><strong>Name:</strong> ${escapeHtml(payload.name)}</li><li><strong>Email:</strong> ${escapeHtml(payload.email)}</li><li><strong>Interest:</strong> ${escapeHtml(payload.interest)}</li></ul><p>${escapeHtml(payload.message).replaceAll("\n", "<br />")}</p>`;

  await sendEmail({
    to: inbox,
    subject,
    text,
    html,
    replyTo: payload.email,
  });
}
