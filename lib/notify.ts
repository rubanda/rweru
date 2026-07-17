type RsvpNotifyPayload = {
  eventSlug: string;
  name: string;
  email: string;
  role: string;
};

export async function notifyRsvp(payload: RsvpNotifyPayload) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[notify] RSVP received (no RESEND_API_KEY set):", payload);
    return;
  }

  const from = process.env.RESEND_FROM_EMAIL ?? "RweruSynapse <onboarding@resend.dev>";
  const subject = `New ${payload.role} RSVP: ${payload.eventSlug}`;
  const text = `New RSVP received.\n\nEvent: ${payload.eventSlug}\nRole: ${payload.role}\nName: ${payload.name}\nEmail: ${payload.email}`;
  const html = `<p>New RSVP received.</p><ul><li><strong>Event:</strong> ${payload.eventSlug}</li><li><strong>Role:</strong> ${payload.role}</li><li><strong>Name:</strong> ${payload.name}</li><li><strong>Email:</strong> ${payload.email}</li></ul>`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: "hello@rweru.com",
      subject,
      text,
      html,
    }),
  });
}
