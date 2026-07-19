import Link from "next/link";

export function Hero() {
  return (
    <section className="site-container section-y">
      <p className="fade-up text-meta mb-6">Technology company based in Rwanda</p>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="fade-up lg:col-span-7">
          <h1 className="text-display-xl font-sans font-bold text-slate">
            Building technology for Africa&apos;s future.
          </h1>
        </div>
        <div className="fade-up-delay flex flex-col justify-end lg:col-span-5">
          <p className="max-w-[40ch] font-serif text-body-lg text-slate-medium">
            We create practical software and AI products, partner with organizations
            to solve meaningful problems, and support a growing community of African
            builders.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/use-cases" className="btn-primary">
              Explore our work
              <span aria-hidden>→</span>
            </Link>
            <Link href="/community" className="btn-secondary">
              Join the community
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
