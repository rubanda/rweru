import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog-data";
import { BlogPostCard } from "@/components/blog-post-card";

const title = "Blog";
const description =
  "Notes from RweruSynapse — how we build products in Rwanda, study African digital systems, and grow a community of contributors.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title,
    description,
    url: "/blog",
  },
};

export default function BlogIndexPage() {
  return (
    <div className="w-full">
      <section className="site-container section-y">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-meta mb-6">Blog</p>
            <h1 className="text-display-xl font-sans font-bold text-slate">
              Writing on software, research, and community.
            </h1>
          </div>
          <div className="flex items-end lg:col-span-5">
            <p className="max-w-[40ch] font-serif text-body-lg text-slate-medium">
              Notes from RweruSynapse — how we build products in Rwanda, study African
              digital systems, and grow a community of contributors.
            </p>
          </div>
        </div>
      </section>

      <section className="site-container pb-[clamp(4rem,8vw,10rem)]">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <BlogPostCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>
      </section>
    </div>
  );
}
