"use client";

import { useState } from "react";
import { CalendarDays, LayoutDashboard, Megaphone, Users } from "lucide-react";
import { masata } from "@/lib/brand";
import { LeadCapture, ToolCard, inputClass } from "./tool-ui";

const tabs = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Members", icon: Users },
  { name: "Events", icon: CalendarDays },
  { name: "Announcements", icon: Megaphone },
];
const initialMembers = ["Aline (sample)", "Jean (sample)", "Grace (sample)"];

export function MasataDemo() {
  const [tab, setTab] = useState("Overview");
  const [members, setMembers] = useState(initialMembers);
  const [registered, setRegistered] = useState(false);
  const [notice, setNotice] = useState("");
  function addMember(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = String(new FormData(form).get("member") || "").trim();
    if (!name || members.length >= 20) return;
    setMembers((previous) => [...previous, name.slice(0, 60)]);
    setNotice(`${name.slice(0, 60)} added to the sample directory.`);
    form.reset();
  }
  return (
    <ToolCard
      id="masata-demo"
      number="08"
      title="A little look inside Masata."
      description="Explore a sample church dashboard. Add a demo member, register for a sample event, and see how a shared workspace feels."
    >
      <div className="overflow-hidden rounded-2xl border border-slate/15">
        <div className="playground-navy flex items-center justify-between gap-4 p-5">
          <div>
            <p className="text-lg font-semibold">
              Masata
              <span className="ml-2 font-mono text-[10px] font-normal text-[#75d2bd]">
                by RWERU
              </span>
            </p>
            <p className="mt-1 text-xs text-[#b7c7d5]">
              Hope Community · sample church
            </p>
          </div>
          <span className="rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
            Demo
          </span>
        </div>
        <div
          role="tablist"
          aria-label="Masata demo sections"
          className="flex overflow-x-auto border-b border-slate/10 bg-ivory-medium"
        >
          {tabs.map((item, index) => (
            <button
              key={item.name}
              id={`masata-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={tab === item.name}
              aria-controls="masata-panel"
              tabIndex={tab === item.name ? 0 : -1}
              onClick={() => setTab(item.name)}
              onKeyDown={(event) => {
                if (
                  ["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)
                ) {
                  event.preventDefault();
                  const next =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? tabs.length - 1
                        : (index +
                            (event.key === "ArrowRight" ? 1 : -1) +
                            tabs.length) %
                          tabs.length;
                  setTab(tabs[next].name);
                  document.getElementById(`masata-tab-${next}`)?.focus();
                }
              }}
              className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-4 text-xs ${tab === item.name ? "border-clay text-clay" : "border-transparent text-slate-medium"}`}
            >
              <item.icon size={15} aria-hidden />
              {item.name}
            </button>
          ))}
        </div>
        <div
          id="masata-panel"
          role="tabpanel"
          aria-labelledby={`masata-tab-${tabs.findIndex((item) => item.name === tab)}`}
          tabIndex={0}
          className="min-h-72 p-5 md:p-7"
        >
          {tab === "Overview" && (
            <>
              <h3 className="text-lg font-semibold">
                Welcome to your church workspace.
              </h3>
              <p className="mt-2 text-sm text-slate-medium">
                A clear view of the people and moments that matter.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ["Members", members.length],
                  ["Events", 2],
                  ["Registrations", registered ? 13 : 12],
                ].map(([label, value]) => (
                  <div key={String(label)} className="rounded-xl bg-clay/5 p-3">
                    <p className="font-mono text-2xl text-clay">{value}</p>
                    <p className="mt-2 text-[10px] text-slate-medium">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setTab("Members")}
                className="btn-secondary mt-6"
              >
                Explore the member directory →
              </button>
            </>
          )}
          {tab === "Members" && (
            <>
              <h3 className="text-lg font-semibold">Member directory</h3>
              <ul className="mt-4 max-h-40 space-y-2 overflow-auto">
                {members.map((member, index) => (
                  <li
                    key={`${index}-${member}`}
                    className="flex items-center gap-3 rounded-lg bg-ivory-medium p-3 text-sm"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-clay/10 text-xs text-clay">
                      {member.charAt(0).toUpperCase()}
                    </span>
                    {member}
                  </li>
                ))}
              </ul>
              <form
                onSubmit={addMember}
                className="mt-5 flex flex-col gap-3 sm:flex-row"
              >
                <label className="flex-1">
                  <span className="sr-only">Sample member name</span>
                  <input
                    name="member"
                    required
                    maxLength={60}
                    placeholder="Add a fictional member"
                    className={inputClass}
                  />
                </label>
                <button
                  disabled={members.length >= 20}
                  className="btn-primary disabled:opacity-50"
                >
                  Add demo member
                </button>
              </form>
              <p role="status" className="mt-3 text-xs text-clay">
                {notice}
              </p>
            </>
          )}
          {tab === "Events" && (
            <>
              <h3 className="text-lg font-semibold">Community calendar</h3>
              <div className="mt-5 rounded-xl border border-slate/10 p-4">
                <p className="text-meta">Sample event · Sunday, 10:00</p>
                <h4 className="mt-2 font-semibold">Community gathering</h4>
                <p className="mt-2 text-xs text-slate-medium">
                  {registered ? 13 : 12} demo registrations
                </p>
                <button
                  onClick={() => setRegistered((previous) => !previous)}
                  className="btn-secondary mt-4"
                >
                  {registered ? "Undo demo registration" : "Try registering"}
                </button>
                <p role="status" className="mt-2 text-xs text-clay">
                  {registered
                    ? "You’re registered in this demo."
                    : "No real reservation is made."}
                </p>
              </div>
              <p className="mt-4 text-sm text-slate-medium">
                Also coming up: volunteer welcome session.
              </p>
            </>
          )}
          {tab === "Announcements" && (
            <>
              <h3 className="text-lg font-semibold">
                Keep your community informed.
              </h3>
              <article className="mt-5 rounded-xl bg-clay/5 p-5">
                <p className="text-meta">Sample announcement</p>
                <h4 className="mt-3 font-semibold">Welcome, volunteers!</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-medium">
                  We’re bringing our volunteers together for a welcome session.
                  Check the calendar and find a team that fits you.
                </p>
                <button
                  type="button"
                  onClick={() => setTab("Events")}
                  className="mt-4 text-sm text-clay link-underline"
                >
                  View events →
                </button>
              </article>
            </>
          )}
        </div>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-slate-medium">
        Illustrative demo with fictional data. Changes last only until you leave
        or refresh this page.{" "}
        <a
          href={masata.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          Visit the real Masata product
        </a>
        .
      </p>
      <details className="mt-5">
        <summary className="cursor-pointer text-sm font-medium text-clay">
          Show me Masata for my church →
        </summary>
        <div className="mt-4">
          <LeadCapture
            source="masata-demo"
            summary="I explored the Masata sample dashboard and would like a demonstration for my church or ministry."
            buttonLabel="Request a Masata walkthrough"
          />
        </div>
      </details>
    </ToolCard>
  );
}
