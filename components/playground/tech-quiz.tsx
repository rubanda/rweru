"use client";

import { useState } from "react";
import Link from "next/link";
import { LeadCapture, ShareResult, ToolCard } from "./tool-ui";

const questions = [
  {
    word: "Mudasobwa",
    options: ["Computer", "Password", "Website"],
    correct: 0,
    explanation: "Mudasobwa means computer.",
  },
  {
    word: "Ijambo ry’ibanga",
    options: ["Email", "Password", "Keyboard"],
    correct: 1,
    explanation:
      "Ijambo ry’ibanga means password: the secret word that protects your account.",
  },
  {
    word: "Murandasi",
    options: ["Screen", "Printer", "Internet"],
    correct: 2,
    explanation: "Murandasi means the internet.",
  },
  {
    word: "Ikoranabuhanga",
    options: ["Technology", "File", "Battery"],
    correct: 0,
    explanation: "Ikoranabuhanga means technology.",
  },
  {
    word: "Urubuga",
    options: ["Charger", "Website", "Mouse"],
    correct: 1,
    explanation: "In a web context, urubuga means website or site.",
  },
];

export function TechQuiz() {
  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState<number[]>([]);
  const question = questions[step];
  const choice = choices[step];
  const score = choices.filter(
    (answer, index) => answer === questions[index].correct,
  ).length;
  const summary = `I scored ${score}/${questions.length} in Rweru’s Kinyarwanda tech word quiz. Try it yourself!`;
  return (
    <ToolCard
      id="tech-quiz"
      number="07"
      title="Tech, in Kinyarwanda."
      description="Five everyday tech words. How many do you know? Learn something, then challenge a friend."
    >
      {question ? (
        <>
          <p className="text-meta">
            Word {step + 1} / {questions.length}
          </p>
          <h3 className="my-6 font-serif text-3xl" lang="rw">
            {question.word}
          </h3>
          <p className="mb-4 text-sm text-slate-medium">
            What does this mean in English?
          </p>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={option}
                type="button"
                disabled={choice !== undefined}
                onClick={() => setChoices((previous) => [...previous, index])}
                className={`w-full rounded-xl border px-4 py-3 text-left text-sm ${choice !== undefined && index === question.correct ? "border-clay bg-clay/10 text-clay" : choice === index ? "border-destructive bg-destructive/5 text-destructive" : "border-slate/15 hover:border-clay/50"}`}
              >
                {option}
                {choice !== undefined && index === question.correct && " ✓"}
              </button>
            ))}
          </div>
          {choice !== undefined && (
            <div className="mt-5">
              <p
                role="status"
                className="text-sm leading-relaxed text-slate-medium"
              >
                {choice === question.correct ? "Correct! " : "Now you know. "}
                {question.explanation}
              </p>
              <button
                type="button"
                onClick={() => setStep((previous) => previous + 1)}
                className="btn-primary mt-4"
              >
                {step === questions.length - 1 ? "See my score" : "Next word"} →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-5">
          <div role="status" className="rounded-2xl bg-clay/5 p-6">
            <p className="font-mono text-4xl font-semibold text-clay">
              {score} / {questions.length}
            </p>
            <h3 className="mt-3 text-xl font-semibold">
              {score === 5
                ? "Tech translator in the making."
                : "A few more words in your toolkit."}
            </h3>
            <p className="mt-2 text-sm text-slate-medium">
              Keep building. Keep learning.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ShareResult
              title="Kinyarwanda tech quiz"
              text={summary}
              anchor="tech-quiz"
            />
            <button
              type="button"
              onClick={() => {
                setStep(0);
                setChoices([]);
              }}
              className="btn-secondary"
            >
              Try again
            </button>
          </div>
          <Link
            href="/community"
            className="inline-block text-sm text-clay link-underline"
          >
            Explore the community →
          </Link>
          <details>
            <summary className="cursor-pointer text-sm font-medium text-clay">
              Talk to us about a local-language product →
            </summary>
            <div className="mt-4">
              <LeadCapture source="tech-quiz" summary={summary} />
            </div>
          </details>
        </div>
      )}
      <p className="mt-7 text-xs leading-relaxed text-slate-medium">
        Terminology used in{" "}
        <a
          href="https://cyber.gov.rw/updates/article/ni-gute-wabika-ijambo-ryibanga-mu-buryo-butekanye/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          NCSA’s Kinyarwanda guidance
        </a>{" "}
        and{" "}
        <a
          href="https://elearning.reb.rw/pluginfile.php/11736/mod_resource/content/1/DC.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          REB learning materials
        </a>
        .
      </p>
    </ToolCard>
  );
}
