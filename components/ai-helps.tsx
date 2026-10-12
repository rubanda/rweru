import { contactHref } from "@/lib/playground";

const cards = [
  {
    kind: "whatsapp",
    title: "Customer WhatsApp messages",
    body: "Draft replies to the questions you get every day, so your team spends less time typing the same answers.",
  },
  {
    kind: "bookings",
    title: "Bookings and orders",
    body: "Sort incoming stays, tables, and deliveries so the next request is easier to see and act on.",
  },
  {
    kind: "reports",
    title: "Reports and notes",
    body: "Turn long updates into a short summary your team can actually read.",
  },
  {
    kind: "language",
    title: "Kinyarwanda and English",
    body: "Write and review content in the languages your customers actually use.",
  },
] as const;

export function AiHelps() {
  return (
    <section
      className="border-t border-slate/10 bg-ivory"
      aria-labelledby="ai-helps-heading"
    >
      <div className="site-container section-y">
        <div className="max-w-2xl">
          <p className="text-meta mb-4">Applied AI</p>
          <h2
            id="ai-helps-heading"
            className="text-display-s font-sans font-semibold text-slate"
          >
            Where AI helps your business
          </h2>
          <p className="mt-4 max-w-[46ch] font-serif text-body-lg text-slate-medium">
            Practical AI, built into the software we make with you — not a
            chatbot on this site.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.kind}
              className="rounded-2xl bg-oat p-6"
            >
              <div
                className={`ai-help-visual ai-help-visual-${card.kind}`}
                aria-hidden
              >
                {card.kind === "whatsapp" ? (
                  <>
                    <span className="ai-bubble ai-bubble-in" />
                    <span className="ai-bubble ai-bubble-out" />
                  </>
                ) : null}
                {card.kind === "bookings" ? (
                  <>
                    <span className="ai-row is-done" />
                    <span className="ai-row" />
                    <span className="ai-row" />
                  </>
                ) : null}
                {card.kind === "reports" ? (
                  <>
                    <span className="ai-line" />
                    <span className="ai-line" />
                    <span className="ai-line is-short" />
                    <span className="ai-summary" />
                  </>
                ) : null}
                {card.kind === "language" ? (
                  <>
                    <span className="ai-lang">EN</span>
                    <span className="ai-lang-swap">RW</span>
                  </>
                ) : null}
              </div>
              <h3 className="mt-5 font-sans text-lg font-semibold text-slate">
                {card.title}
              </h3>
              <p className="mt-3 font-serif text-sm leading-relaxed text-slate-medium">
                {card.body}
              </p>
            </article>
          ))}
        </div>

        <a
          href={contactHref(
            "Hello Rweru! I’d like to talk about AI for my business.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-10"
        >
          Talk to us about AI for your business
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
