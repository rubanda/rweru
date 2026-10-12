import { contactHref } from "@/lib/playground";

export function HomeWhatsappStrip() {
  return (
    <div className="site-container">
      <div className="flex justify-end border-y border-slate/10 py-2.5">
        <a
          href={contactHref("Hello Rweru! I’d like to discuss a project.")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-slate-medium transition-colors hover:text-clay"
        >
          WhatsApp us
          <span aria-hidden> ↗</span>
        </a>
      </div>
    </div>
  );
}
