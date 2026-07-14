import { blogPosts } from "@/lib/blog-data";
import Link from "next/link";

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
        <div className="hidden grid-cols-12 gap-4 border-b border-slate/10 pb-3 md:grid">
          <span className="text-meta col-span-2">Date</span>
          <span className="text-meta col-span-2">Category</span>
          <span className="text-meta col-span-8">Title</span>
        </div>
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="grid grid-cols-1 gap-2 border-b border-slate/10 py-6 transition-colors hover:text-clay md:grid-cols-12 md:items-baseline md:gap-4"
          >
            <span className="text-meta md:col-span-2">{post.date}</span>
            <span className="text-meta md:col-span-2">{post.category}</span>
            <span className="font-sans text-lg font-medium md:col-span-8 md:text-xl">
              {post.title}
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
