"use client";

import { useState } from "react";
import { DiscussLink, LeadCapture, ShareResult, ToolCard } from "./tool-ui";

const squares = [
  "The business lives in a notebook",
  "Three WhatsApp groups for one task",
  "Payments confirmed by screenshot",
  "Same data, entered twice",
  "‘Who has the latest spreadsheet?’",
  "A booking got lost in the chat",
  "Reports take the whole weekend",
  "Only one person knows the process",
  "Customers keep asking for a link",
];
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function BusinessBingo() {
  const [selected, setSelected] = useState<number[]>([]);
  const complete = lines.filter((line) =>
    line.every((index) => selected.includes(index)),
  );
  const winning = new Set(complete.flat());
  const verdict = complete.length
    ? "Bingo! Your WhatsApp deserves a day off."
    : selected.length >= 3
      ? "A few familiar signs. One small tool could help."
      : selected.length
        ? "We’ve all been there. Keep tapping."
        : "Be honest. We won’t tell your spreadsheet.";
  const summary = `My software bingo: ${selected.length}/9 signs, ${complete.length} completed lines.\n${selected.map((index) => `• ${squares[index]}`).join("\n")}\n${verdict}`;
  return (
    <ToolCard
      id="bingo"
      number="05"
      title="Business software bingo"
      description="Tap the things that sound like your business. Three in a row? It might be time to build something."
    >
      <div className="grid grid-cols-3 gap-2">
        {squares.map((square, index) => (
          <button
            key={square}
            type="button"
            aria-pressed={selected.includes(index)}
            onClick={() =>
              setSelected((previous) =>
                previous.includes(index)
                  ? previous.filter((value) => value !== index)
                  : [...previous, index],
              )
            }
            className={`flex min-h-28 items-center justify-center rounded-xl border p-2 text-center text-xs leading-relaxed transition-colors sm:p-3 ${winning.has(index) ? "border-clay bg-clay text-ivory" : selected.includes(index) ? "border-clay bg-clay/10 text-clay" : "border-slate/15 hover:border-clay/50"}`}
          >
            {square}
          </button>
        ))}
      </div>
      <div className="my-5 rounded-xl bg-clay/5 p-5" role="status">
        <p className="text-lg font-semibold">{verdict}</p>
        <p className="mt-2 text-xs text-slate-medium">
          {selected.length}/9 signs · {complete.length}{" "}
          {complete.length === 1 ? "line" : "lines"} completed
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <ShareResult
          title="Rweru software bingo"
          text={summary}
          anchor="bingo"
        />
        <button
          type="button"
          className="btn-secondary"
          onClick={() => setSelected([])}
        >
          Reset card
        </button>
      </div>
      {complete.length > 0 && (
        <div className="mt-5">
          <DiscussLink summary={summary}>
            Book a discovery conversation
          </DiscussLink>
        </div>
      )}
      <details className="mt-5">
        <summary className="cursor-pointer text-sm font-medium text-clay">
          Help me untangle my process →
        </summary>
        <div className="mt-4">
          <LeadCapture key={summary} source="bingo" summary={summary} />
        </div>
      </details>
    </ToolCard>
  );
}
