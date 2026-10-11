This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Rweru Playground

Visit `/playground` for a card gallery grouped into business tools, games, and
product demos. The starter product quiz is the featured first choice. Selecting a
card opens one tool at `/playground/[tool]`; forms and games run only on that tool's
page. The back link returns to its gallery category. Each tool has a shareable URL
and metadata; homepage links, share buttons, and the sitemap use these URLs.
The site also has a saved light/dark theme,
a Kigali clock, and a rotating shipping ticker with a pause control.

- WhatsApp defaults to **+250 793 126 602**. Override it with
  `NEXT_PUBLIC_WHATSAPP_NUMBER` (a public, build-time setting).
- The estimator shows **weeks only**. Change planning assumptions in
  `lib/playground.ts`; `estimatorConfig.pricing` is intentionally `null` until
  approved currency and price ranges are supplied.
- Lead forms send contact details, explicit project-contact consent, and tool
  results to `CONTACT_TO_EMAIL` through Resend. Set `RESEND_API_KEY` and a verified
  `RESEND_FROM_EMAIL` before enabling inbox capture in production. They do not
  subscribe visitors to a mailing list or automatically email/WhatsApp them.
  The quiz unlocks a downloadable plan after successful submission. If email
  delivery is unconfigured, it shows that limitation, unlocks the plan locally,
  and offers direct WhatsApp contact. Provider failures retain the form for retry.
- For the website checker, enable the Google PageSpeed Insights API and set
  `PAGESPEED_API_KEY`. Anonymous quota can be unavailable. Actual measurements
  appear only when Google returns them; HTML viewport and WhatsApp checks can
  succeed independently. JavaScript-rendered buttons may not be detected.
  Only public HTTPS domains are inspected; DNS addresses are validated and pinned
  for each HTML request and redirect, with time and response-size limits.
- API rate limits are per process, not a shared production store. Configure your
  hosting platform's request limits or a shared store when running at scale.
- Ship Night's top-five leaderboard and theme preference use local browser
  storage. There is no shared leaderboard or database. Demo members and app
  previews stay in memory; refreshing resets them.
- Update real shipping entries in `lib/shipping.ts`. They are editorial updates,
  not a live activity feed. The clock's office-hours indicator is Monday–Friday,
  09:00–18:00 `Africa/Kigali`; it does not claim live staff presence.

Run `npm run lint`, `npm test`, and `npm run build` to verify changes. Tests use
Node 24's built-in runner and cover product recommendations, estimates, contact
validation, mocked email delivery, rate limits, and public-address validation.
No test sends a real email.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
