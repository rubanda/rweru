"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { buildProductPlan, planText, quizQuestions } from "@/lib/playground";
import {
  DiscussLink,
  DownloadResult,
  LeadCapture,
  ShareResult,
} from "./tool-ui";

export function ProductQuiz() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const question = quizQuestions[step];
  const plan = step === quizQuestions.length ? buildProductPlan(answers) : null;
  function navigate(next: number) {
    setStep(next);
    requestAnimationFrame(() => heading.current?.focus());
  }
  function restart() {
    setAnswers([]);
    setUnlocked(false);
    navigate(0);
  }
  return (
    <section
      id="product-quiz"
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate/10 bg-ivory"
    >
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="playground-navy flex flex-col justify-between p-7 md:p-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#75d2bd]">
              01 / The idea starter
            </p>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
              What should
              <br />
              we build?
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#b7c7d5]">
              Five quick questions. One clear direction for your business. No
              technical knowledge needed.
            </p>
          </div>
          <div className="mt-12 rounded-2xl border border-white/15 bg-white/5 p-5">
            <Sparkles className="text-[#75d2bd]" size={24} aria-hidden />
            <p className="mt-3 text-sm">Leave with a starter product plan.</p>
            <p className="mt-2 text-xs leading-relaxed text-[#b7c7d5]">
              A recommended product, first-version features, and a practical
              next step.
            </p>
          </div>
        </div>
        <div className="p-6 md:p-10">
          <div
            className="mb-8 flex gap-2"
            aria-label={`${Math.min(step + 1, 5)} of 5 questions`}
          >
            {quizQuestions.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-clay" : "bg-slate/10"}`}
              />
            ))}
          </div>
          {question ? (
            <>
              <p className="text-meta">
                Question {step + 1} of 5 · About a minute
              </p>
              <h3
                ref={heading}
                tabIndex={-1}
                className="mt-3 text-xl font-semibold outline-none md:text-2xl"
              >
                {question.title}
              </h3>
              <fieldset className="mt-6 space-y-3">
                <legend className="sr-only">{question.title}</legend>
                {question.options.map((option, index) => (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition-colors ${answers[step] === index ? "border-clay bg-clay/5" : "border-slate/15 hover:border-clay/50"}`}
                  >
                    <input
                      type="radio"
                      name={`question-${step}`}
                      checked={answers[step] === index}
                      onChange={() =>
                        setAnswers((previous) => {
                          const next = [...previous];
                          next[step] = index;
                          return next;
                        })
                      }
                      className="size-4 accent-clay"
                    />
                    {option}
                  </label>
                ))}
              </fieldset>
              <div className="mt-7 flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={() => navigate(step - 1)}
                  className="btn-secondary disabled:opacity-40"
                >
                  <ArrowLeft size={16} aria-hidden />
                  Back
                </button>
                <button
                  type="button"
                  disabled={answers[step] === undefined}
                  onClick={() => navigate(step + 1)}
                  className="btn-primary disabled:opacity-40"
                >
                  {step === 4 ? "Create my plan" : "Next"}
                  <ArrowRight size={16} aria-hidden />
                </button>
              </div>
            </>
          ) : (
            plan && (
              <>
                <h3
                  ref={heading}
                  tabIndex={-1}
                  className="text-2xl font-semibold outline-none"
                >
                  {unlocked
                    ? "Your starter product plan"
                    : "Your plan is ready."}
                </h3>
                {!unlocked && (
                  <p className="my-4 text-sm leading-relaxed text-slate-medium">
                    Enter your email or WhatsApp to unlock your plan here and
                    download a copy. Rweru can follow up to help you get
                    started.
                  </p>
                )}
                {unlocked && (
                  <div className="my-6 space-y-5" aria-live="polite">
                    <div>
                      <p className="text-meta text-clay">Our recommendation</p>
                      <h4 className="mt-2 text-2xl font-semibold">
                        {plan.title}
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-slate-medium">
                        {plan.description}
                      </p>
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-sm"
                        >
                          <Check
                            size={16}
                            className="shrink-0 text-clay"
                            aria-hidden
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-xl bg-clay/5 p-4">
                      <p className="text-sm font-semibold">Your next step</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-medium">
                        {plan.firstStep}
                      </p>
                    </div>
                    <p className="text-xs text-slate-medium">
                      A starting point for discussion, not a specification or
                      quote.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <DownloadResult text={planText(plan)} />
                      <ShareResult
                        title="My Rweru starter plan"
                        text={`My next build: ${plan.title}. Find yours with Rweru.`}
                        anchor="product-quiz"
                      />
                      <DiscussLink summary={planText(plan)} />
                    </div>
                  </div>
                )}
                <LeadCapture
                  key={answers.join("-")}
                  source="product-quiz"
                  answers={answers}
                  summary={planText(plan)}
                  onComplete={() => setUnlocked(true)}
                  buttonLabel="Unlock my starter plan"
                />
                <div className="mt-5 flex gap-5 text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setUnlocked(false);
                      navigate(4);
                    }}
                    className="link-underline"
                  >
                    Edit answers
                  </button>
                  <button
                    type="button"
                    onClick={restart}
                    className="link-underline"
                  >
                    Start again
                  </button>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </section>
  );
}
