const steps = [
  "Idea",
  "Design",
  "Build",
  "AI automation",
  "Launch",
] as const;

export function BuildWorkflow() {
  return (
    <div className="build-workflow">
      <div className="build-workflow-track" aria-hidden>
        <span className="build-workflow-progress" />
      </div>
      <ol
        className="build-workflow-steps"
        aria-label="How a project moves from idea to launch"
      >
        {steps.map((step) => (
          <li
            key={step}
            className={`build-workflow-step${step === "AI automation" ? " is-ai" : ""}`}
          >
            <span className="build-workflow-dot" aria-hidden />
            <span className="build-workflow-label">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
