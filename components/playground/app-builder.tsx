"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  CreditCard,
  GripVertical,
  LayoutDashboard,
  MessageCircle,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import { LeadCapture, ShareResult, ToolCard } from "./tool-ui";

const blocks = [
  {
    id: "members",
    label: "Members",
    icon: Users,
    detail: "A place for your people",
    examples: ["Community directory", "Member profiles"],
  },
  {
    id: "bookings",
    label: "Bookings",
    icon: CalendarDays,
    detail: "Make room for what’s next",
    examples: ["Choose a date", "Reserve your spot"],
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
    detail: "Simple, clear transactions",
    examples: ["Mobile money", "Payment history"],
  },
  {
    id: "shop",
    label: "Shop",
    icon: ShoppingBag,
    detail: "Your next favourite find",
    examples: ["Browse products", "Your shopping bag"],
  },
  {
    id: "messages",
    label: "Messages",
    icon: MessageCircle,
    detail: "Keep everyone in the loop",
    examples: ["Latest updates", "Contact the team"],
  },
  {
    id: "reports",
    label: "Reports",
    icon: LayoutDashboard,
    detail: "See the bigger picture",
    examples: ["This week’s activity", "Your overview"],
  },
];
const presets: Record<string, string[]> = {
  Church: ["members", "messages"],
  Hotel: ["bookings", "payments"],
  Shop: ["shop", "payments"],
};

export function AppBuilder() {
  const [business, setBusiness] = useState("Church");
  const [selected, setSelected] = useState<string[]>(presets.Church);
  const [active, setActive] = useState("members");
  const [dragged, setDragged] = useState<string | null>(null);
  const activeBlock = blocks.find(
    (block) => block.id === active && selected.includes(block.id),
  );
  function add(id: string) {
    setSelected((previous) =>
      previous.includes(id) ? previous : [...previous, id],
    );
    setActive(id);
  }
  function remove(id: string) {
    const next = selected.filter((block) => block !== id);
    setSelected(next);
    if (active === id) setActive(next[0] ?? "");
  }
  function move(id: string, direction: number) {
    setSelected((previous) => {
      const next = [...previous];
      const from = next.indexOf(id);
      const to = from + direction;
      if (to < 0 || to >= next.length) return previous;
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
  }
  function drop(before?: string) {
    if (!dragged) return;
    if (dragged === before) {
      setDragged(null);
      return;
    }
    setSelected((previous) => {
      const next = previous.filter((id) => id !== dragged);
      const position = before ? next.indexOf(before) : -1;
      next.splice(position < 0 ? next.length : position, 0, dragged);
      return next;
    });
    setActive(dragged);
    setDragged(null);
  }
  const summary = `My ${business.toLowerCase()} app idea: ${selected.map((id) => blocks.find((block) => block.id === id)?.label).join(", ") || "starting with a blank canvas"}. Built in the Rweru Playground. I’d like to discuss making it real.`;
  return (
    <ToolCard
      id="app-builder"
      number="04"
      title="Your app. In 60 seconds."
      description="Choose a business, add blocks, and try your idea on a phone. This is an interactive mockup with sample content."
      className="@container"
    >
      <fieldset>
        <legend className="sr-only">Business type</legend>
        <div className="flex flex-wrap gap-2">
          {Object.keys(presets).map((type) => (
            <button
              key={type}
              type="button"
              aria-pressed={business === type}
              onClick={() => {
                setBusiness(type);
                setSelected(presets[type]);
                setActive(presets[type][0]);
              }}
              className={business === type ? "btn-primary" : "btn-secondary"}
            >
              {type}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="mt-6 grid items-start gap-6 @min-[430px]:grid-cols-[1fr_230px]">
        <div>
          <p className="text-meta mb-3">Tap or drag a block</p>
          <div className="grid grid-cols-2 gap-2">
            {blocks.map((block) => (
              <button
                key={block.id}
                type="button"
                draggable
                onDragStart={() => setDragged(block.id)}
                onDragEnd={() => setDragged(null)}
                onClick={() => add(block.id)}
                aria-pressed={selected.includes(block.id)}
                className={`flex flex-col items-start gap-2 rounded-xl border p-3 text-xs transition-colors ${selected.includes(block.id) ? "border-clay bg-clay/5 text-clay" : "border-slate/15 hover:border-clay"}`}
              >
                <block.icon size={20} aria-hidden />
                {block.label}
                <span className="text-[10px] text-slate-medium">
                  {selected.includes(block.id) ? "Added" : "+ Add block"}
                </span>
              </button>
            ))}
          </div>
          <p className="text-meta mb-2 mt-6">Arrange your app</p>
          <div className="space-y-2">
            {selected.map((id, index) => (
              <div
                key={id}
                draggable
                onDragStart={() => setDragged(id)}
                onDragEnd={() => setDragged(null)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  drop(id);
                }}
                className="flex items-center gap-1 rounded-lg border border-slate/10 p-2 text-xs"
              >
                <GripVertical
                  size={14}
                  className="shrink-0 text-slate-medium"
                  aria-hidden
                />
                <span className="min-w-0 flex-1">
                  {blocks.find((block) => block.id === id)?.label}
                </span>
                <button
                  onClick={() => move(id, -1)}
                  disabled={index === 0}
                  aria-label={`Move ${id} up`}
                  className="rounded p-1.5 hover:bg-slate/5 disabled:opacity-30"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  onClick={() => move(id, 1)}
                  disabled={index === selected.length - 1}
                  aria-label={`Move ${id} down`}
                  className="rounded p-1.5 hover:bg-slate/5 disabled:opacity-30"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  onClick={() => remove(id)}
                  aria-label={`Remove ${id}`}
                  className="rounded p-1.5 hover:bg-slate/5"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            drop();
          }}
          className={`mx-auto w-[230px] rounded-[2.5rem] border-[7px] border-[#15202b] bg-[#f7f9fb] p-3 text-[#15202b] shadow-xl ${dragged ? "ring-4 ring-clay/30" : ""}`}
          aria-label="Your app preview"
        >
          <div className="mx-auto mb-5 h-4 w-20 rounded-full bg-[#15202b]" />
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#17665a]">
            Your {business.toLowerCase()}
          </p>
          <h3 className="mt-2 text-lg font-semibold">Hello, builder.</h3>
          <p className="mt-1 text-[10px] text-[#4f5c6a]">
            A little idea. A lot of possibilities.
          </p>
          <div className="my-5 min-h-44 rounded-xl bg-[#e3e9f0] p-3">
            {activeBlock ? (
              <>
                <activeBlock.icon
                  size={24}
                  className="text-[#17665a]"
                  aria-hidden
                />
                <h4 className="mt-3 text-sm font-semibold">
                  {activeBlock.label}
                </h4>
                <p className="mt-1 text-[10px] text-[#4f5c6a]">
                  {activeBlock.detail}
                </p>
                {activeBlock.examples.map((example) => (
                  <div
                    key={example}
                    className="mt-2 rounded-md bg-white p-2 text-[10px]"
                  >
                    {example}
                    <span className="float-right">→</span>
                  </div>
                ))}
              </>
            ) : (
              <p className="py-10 text-center text-xs text-[#4f5c6a]">
                Drop a block here
                <br />
                or tap one to begin.
              </p>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            {selected.map((id) => {
              const block = blocks.find((item) => item.id === id)!;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  aria-pressed={active === id}
                  className={`flex min-w-12 flex-col items-center gap-1 rounded-lg px-2 py-2 text-[8px] ${active === id ? "bg-[#17665a] text-white" : "text-[#4f5c6a]"}`}
                >
                  <block.icon size={15} aria-hidden />
                  {block.label}
                </button>
              );
            })}
          </div>
          <p className="mt-5 text-center font-mono text-[8px] uppercase tracking-widest text-[#4f5c6a]">
            Made with imagination × Rweru
          </p>
        </div>
      </div>
      <div className="mt-6">
        <ShareResult
          title="My Rweru app idea"
          text={summary}
          anchor="app-builder"
        />
      </div>
      <details className="mt-5">
        <summary className="cursor-pointer text-sm font-medium text-clay">
          Make this idea real →
        </summary>
        <div className="mt-4">
          <LeadCapture
            key={summary}
            source="app-builder"
            summary={summary}
            buttonLabel="Let’s build my app"
          />
        </div>
      </details>
    </ToolCard>
  );
}
