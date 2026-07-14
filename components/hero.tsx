import Link from "next/link";

export function Hero() {
  return (
    <section className="site-container section-y">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="fade-up lg:col-span-7">
          <h1 className="text-display-xl font-sans font-bold text-slate">
            Software{" "}
            <Link href="/solutions" className="link-underline">
              solutions
            </Link>
            ,{" "}
            <Link href="/research" className="link-underline">
              research
            </Link>
            , and a{" "}
            <Link href="/community" className="link-underline">
              community
            </Link>{" "}
            for Africa&apos;s builders.
          </h1>
        </div>
        <div className="fade-up-delay flex flex-col justify-end lg:col-span-5">
          <p className="max-w-[40ch] font-serif text-body-lg text-slate-medium">
            RweruSynapse is a software company based in Kigali. We help teams across
            Rwanda and Africa ship reliable products — and we publish, teach, and grow
            an open community of African technologists.
          </p>
        </div>
      </div>
    </section>
  );
}
