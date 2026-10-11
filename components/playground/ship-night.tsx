"use client";

import { useEffect, useReducer, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Bug, Rocket, Trophy } from "lucide-react";
import { LeadCapture, ShareResult, ToolCard, inputClass } from "./tool-ui";

type Game = {
  running: boolean;
  played: boolean;
  score: number;
  remaining: number;
  target: number;
  seed: number;
  deadline: number;
  frame: number;
};
type Action = { type: "start" | "tick" | "hit"; now: number; cell?: number };
const initial: Game = {
  running: false,
  played: false,
  score: 0,
  remaining: 20,
  target: 4,
  seed: 1,
  deadline: 0,
  frame: 20,
};

function nextBug(game: Game) {
  const seed = (Math.imul(game.seed, 1664525) + 1013904223) >>> 0;
  // Always move to another square, including after a successful hit.
  return { seed, target: (game.target + 1 + (seed % 8)) % 9 };
}

function reducer(game: Game, action: Action): Game {
  if (action.type === "start")
    return {
      ...initial,
      running: true,
      played: true,
      deadline: action.now + 20_000,
      seed: action.now >>> 0,
    };
  if (!game.running) return game;
  const remaining = Math.max(0, Math.ceil((game.deadline - action.now) / 1000));
  if (!remaining) return { ...game, remaining: 0, running: false };
  if (action.type === "tick")
    return {
      ...game,
      remaining,
      ...(remaining !== game.frame
        ? { ...nextBug(game), frame: remaining }
        : {}),
    };
  if (action.cell === game.target)
    return { ...game, ...nextBug(game), score: game.score + 10, remaining };
  return { ...game, score: Math.max(0, game.score - 2), remaining };
}

const scoreKey = "rweru-ship-night-scores-v1";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("rweru-scores", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("rweru-scores", callback);
  };
}
function snapshot() {
  try {
    return localStorage.getItem(scoreKey) ?? "";
  } catch {
    return "";
  }
}
function readScores(raw: string): { name: string; score: number }[] {
  try {
    const values = JSON.parse(raw);
    return Array.isArray(values)
      ? values
          .filter(
            (entry) =>
              entry &&
              typeof entry.name === "string" &&
              entry.name.length <= 24 &&
              Number.isInteger(entry.score) &&
              entry.score >= 0 &&
              entry.score <= 100_000,
          )
          .slice(0, 5)
      : [];
  } catch {
    return [];
  }
}

export function ShipNight() {
  const [game, dispatch] = useReducer(reducer, initial);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const raw = useSyncExternalStore(subscribe, snapshot, () => "");
  const scores = readScores(raw);
  useEffect(() => {
    if (!game.running) return;
    const timer = setInterval(
      () => dispatch({ type: "tick", now: Date.now() }),
      200,
    );
    return () => clearInterval(timer);
  }, [game.running]);
  function start() {
    setSaved(false);
    setSaveError("");
    dispatch({ type: "start", now: Date.now() });
  }
  function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name =
      String(new FormData(event.currentTarget).get("nickname") || "Builder")
        .trim()
        .slice(0, 24) || "Builder";
    try {
      localStorage.setItem(
        scoreKey,
        JSON.stringify(
          [...scores, { name, score: game.score }]
            .sort((a, b) => b.score - a.score)
            .slice(0, 5),
        ),
      );
      window.dispatchEvent(new Event("rweru-scores"));
      setSaved(true);
    } catch {
      setSaveError(
        "Your browser could not save scores. You can still play and share your result.",
      );
    }
  }
  return (
    <ToolCard
      id="ship-night"
      number="06"
      title="Catch bugs. Ship features."
      description="You have 20 seconds to catch as many bugs as you can. +10 for a bug, −2 for an empty square. Tap, click, or use Tab and Enter."
    >
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <div className="mb-4 flex justify-between font-mono text-sm">
            <span>
              Score <strong className="text-clay">{game.score}</strong>
            </span>
            <span>
              Time <strong className="text-clay">{game.remaining}s</strong>
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }, (_, cell) => (
              <button
                key={cell}
                type="button"
                disabled={!game.running}
                aria-label={`${game.running && game.target === cell ? "Catch bug" : "Empty square"}, row ${Math.floor(cell / 3) + 1}, column ${(cell % 3) + 1}`}
                onClick={() => dispatch({ type: "hit", now: Date.now(), cell })}
                className={`flex aspect-square items-center justify-center rounded-xl border transition-colors disabled:opacity-50 ${game.running && game.target === cell ? "border-clay bg-clay/10 text-clay" : "border-slate/15 bg-ivory-medium text-slate/20"}`}
              >
                {game.running && game.target === cell ? (
                  <Bug size={32} aria-hidden />
                ) : (
                  <span
                    aria-hidden
                    className="size-2 rounded-full bg-current"
                  />
                )}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={start}
            disabled={game.running}
            className="btn-primary mt-5 w-full disabled:opacity-50"
          >
            <Rocket size={16} aria-hidden />
            {game.running
              ? "Shipping in progress…"
              : game.played
                ? "Ship another round"
                : "Start Ship Night"}
          </button>
          <p className="mt-3 text-xs leading-relaxed text-slate-medium">
            Friendly competition on this device. Scores are saved in your
            browser and can be cleared with your browser data.
          </p>
        </div>
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Trophy size={18} className="text-clay" aria-hidden />
            Leaderboard · this device
          </h3>
          <ol className="mt-4 space-y-2">
            {scores.map((entry, index) => (
              <li
                key={`${index}-${entry.name}`}
                className="flex items-center gap-3 rounded-xl bg-ivory-medium px-4 py-3 text-sm"
              >
                <span className="font-mono text-xs text-slate-medium">
                  0{index + 1}
                </span>
                <span className="min-w-0 flex-1 truncate">{entry.name}</span>
                <span className="font-mono text-clay">{entry.score}</span>
              </li>
            ))}
          </ol>
          {!scores.length && (
            <p className="my-6 text-sm text-slate-medium">
              Your name could be first. Catch a few bugs and claim your spot.
            </p>
          )}
          {game.played && !game.running && (
            <div className="mt-6 space-y-4">
              <p role="status" className="text-lg font-semibold">
                Feature shipped. {game.score} points!
              </p>
              {!saved ? (
                <form onSubmit={save} className="space-y-3">
                  <label className="block text-xs">
                    Nickname
                    <input
                      name="nickname"
                      required
                      maxLength={24}
                      placeholder="Your builder name"
                      autoComplete="off"
                      className={`${inputClass} mt-2`}
                    />
                  </label>
                  <button className="btn-secondary w-full">
                    Save my score
                  </button>
                </form>
              ) : (
                <p role="status" className="text-sm text-clay">
                  Score saved on this device.
                </p>
              )}
              {saveError && (
                <p role="alert" className="text-xs text-destructive">
                  {saveError}
                </p>
              )}
              <ShareResult
                title="Ship Night by Rweru"
                text={`I caught bugs and shipped a feature: ${game.score} points in Rweru’s Ship Night. Your turn.`}
                anchor="ship-night"
              />
              <Link
                href="/community"
                className="inline-block text-sm text-clay link-underline"
              >
                Meet the Rweru builders →
              </Link>
            </div>
          )}
        </div>
      </div>
      {game.played && !game.running && (
        <details className="mt-6">
          <summary className="cursor-pointer text-sm font-medium text-clay">
            Have an interactive idea of your own? →
          </summary>
          <div className="mt-4">
            <LeadCapture
              source="ship-night"
              summary={`I played Ship Night and scored ${game.score} points. I would like to discuss an interactive tool or game for my business.`}
              buttonLabel="Let’s talk about my idea"
            />
          </div>
        </details>
      )}
    </ToolCard>
  );
}
