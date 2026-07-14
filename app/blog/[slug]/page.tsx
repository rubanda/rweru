import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <header className="site-container section-y">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="text-meta">{post.category}</span>
            <span className="text-cloud">·</span>
            <span className="text-meta">{post.date}</span>
          </div>
          <h1 className="text-display-xl font-sans font-bold text-slate">
            {post.title}
          </h1>
          <p className="mt-8 max-w-[42ch] font-serif text-body-lg text-slate-medium">
            {post.excerpt}
          </p>
          <p className="mt-8 text-sm text-slate-light">
            {post.author.name} · {post.author.role}
          </p>
        </div>
      </header>

      <div className="site-container pb-[clamp(4rem,8vw,10rem)]">
        <div className="mx-auto max-w-2xl font-serif text-lg leading-relaxed text-slate-medium">
          <p className="mb-6">
            At RweruSynapse we believe African software should be designed for African
            conditions — intermittent connectivity, multilingual users, mobile-first
            access, and institutions that grow carefully rather than overnight.
          </p>
          <h2 className="mb-4 mt-12 font-sans text-2xl font-semibold text-slate">
            Why this matters
          </h2>
          <p className="mb-6">
            Too many products are copied from contexts that assume always-on broadband,
            card payments, and English-only interfaces. The result is friction for the
            people who need digital tools the most.
          </p>
          <p className="mb-6">
            This piece is part of our ongoing writing on engineering, research, and
            community. We publish to share what we learn building from Kigali — and to
            invite contributors across Africa to improve the work.
          </p>
          <h2 className="mb-4 mt-12 font-sans text-2xl font-semibold text-slate">
            What we&apos;re exploring
          </h2>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>Delivery habits that survive real infrastructure constraints</li>
            <li>Research that informs product decisions for local markets</li>
            <li>Community models where Africans learn and contribute together</li>
          </ul>
          <p>
            If this resonates, join the conversation through our{" "}
            <Link href="/community" className="link-underline text-slate">
              community
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="link-underline text-slate">
              get in touch
            </Link>
            .
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl border-t border-slate/10 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate hover:text-clay"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
