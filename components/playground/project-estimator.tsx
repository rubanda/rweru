"use client";

import { useState } from "react";
import { estimateProject, featureOptions } from "@/lib/playground";
import { DownloadResult, LeadCapture, ToolCard } from "./tool-ui";

export function ProjectEstimator() {
  const [pages, setPages] = useState(5);
  const [features, setFeatures] = useState<string[]>(["Admin dashboard"]);
  const [mobile, setMobile] = useState(false);
  const estimate = estimateProject(pages, features.length, mobile);
  const summary = `RWERU · Rough project scope\n\n${pages} pages/screens\nFeatures: ${features.join(", ") || "Content only"}\nMobile app: ${mobile ? "Yes" : "No"}\nPlanning range: ${estimate.minWeeks}–${estimate.maxWeeks} weeks\n\nIndicative build time after scope and content are agreed. Integrations, approvals, and complexity can change this.\n\nrweru.com/contact`;
  return (
    <ToolCard
      id="estimator"
      number="03"
      title="How big is your idea?"
      description="Slide, select, and get a rough build-time range for your first version."
    >
      <label className="block text-sm font-medium" htmlFor="project-pages">
        Pages or screens{" "}
        <span className="float-right font-mono text-clay">{pages}</span>
      </label>
      <input
        id="project-pages"
        type="range"
        min={1}
        max={25}
        value={pages}
        onChange={(event) => setPages(Number(event.target.value))}
        className="mt-4 w-full accent-clay"
      />
      <div className="mt-1 flex justify-between font-mono text-xs text-slate-medium">
        <span>1 · Keep it small</span>
        <span>25 · Think bigger</span>
      </div>
      <fieldset className="mt-7">
        <legend className="text-sm font-medium">What should it do?</legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {featureOptions.map((feature) => (
            <label
              key={feature}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-3 text-xs ${features.includes(feature) ? "border-clay bg-clay/5" : "border-slate/15"}`}
            >
              <input
                type="checkbox"
                checked={features.includes(feature)}
                onChange={() =>
                  setFeatures((previous) =>
                    previous.includes(feature)
                      ? previous.filter((item) => item !== feature)
                      : [...previous, feature],
                  )
                }
                className="accent-clay"
              />
              {feature}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="mt-6 flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={mobile}
          onChange={(event) => setMobile(event.target.checked)}
          className="size-4 accent-clay"
        />
        Include a mobile app
      </label>
      <div className="my-6 rounded-2xl bg-clay/5 p-6" role="status">
        <p className="text-meta text-clay">Indicative build time</p>
        <p className="mt-3 text-4xl font-semibold tracking-tight">
          {estimate.minWeeks}–{estimate.maxWeeks}{" "}
          <span className="text-lg font-normal">weeks</span>
        </p>
        {estimate.price && (
          <p className="mt-3 font-mono text-sm">
            {estimate.price.currency} {estimate.price.min.toLocaleString()}–
            {estimate.price.max.toLocaleString()}
          </p>
        )}
        <p className="mt-3 text-xs leading-relaxed text-slate-medium">
          After scope and content are agreed. Custom integrations, design
          complexity, and approvals can change the timeline. We’ll confirm it
          together.
        </p>
      </div>
      <DownloadResult text={summary} filename="rweru-project-scope.txt" />
      <details className="mt-5">
        <summary className="cursor-pointer text-sm font-medium text-clay">
          Get a timeline for my project →
        </summary>
        <div className="mt-4">
          <LeadCapture
            key={summary}
            source="estimator"
            summary={summary}
            buttonLabel="Discuss my timeline"
          />
        </div>
      </details>
    </ToolCard>
  );
}
