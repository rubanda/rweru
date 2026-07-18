import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import { BlogPostingJsonLd } from "@/components/structured-data";
import { AuthorBio } from "@/components/author-bio";

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
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${slug}`,
      publishedTime: post.date,
    },
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
      <BlogPostingJsonLd post={post} />
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
          {post.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="mb-4 mt-12 font-sans text-2xl font-semibold text-slate">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
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

        <div className="mx-auto mt-12 max-w-2xl">
          <AuthorBio author={post.author} />
        </div>

        <div className="mx-auto mt-10 max-w-2xl border-t border-slate/10 pt-8">
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
