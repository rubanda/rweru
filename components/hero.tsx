import Link from "next/link";

export function Hero() {
  return (
    <section className="site-container section-y">
      <p className="fade-up text-meta mb-6">Kigali, Rwanda → building for Africa</p>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="fade-up lg:col-span-7">
          <h1 className="text-display-xl font-sans font-bold text-slate">
            <Link href="/solutions" className="link-underline">
              Software
            </Link>{" "}
            that ships,{" "}
            <Link href="/research" className="link-underline">
              research
            </Link>{" "}
            grounded in reality, and a{" "}
            <Link href="/community" className="link-underline">
              community
            </Link>{" "}
            built for Africa&apos;s next builders.
          </h1>
        </div>
        <div className="fade-up-delay flex flex-col justify-end lg:col-span-5">
          <p className="max-w-[40ch] font-serif text-body-lg text-slate-medium">
            RweruSynapse is a software company based in Kigali. We design and run
            production platforms for organizations across Rwanda, Uganda, and Europe —
            and we publish, teach, and grow an open community of African technologists.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Talk to us
              <span aria-hidden>→</span>
            </Link>
            <Link href="/use-cases" className="btn-secondary">
              See what we&apos;ve shipped
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
