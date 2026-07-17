import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-data";

export function BlogPostCard({
  post,
  priority = false,
}: {
  post: BlogPost;
  priority?: boolean;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-oat transition-transform duration-300 hover:-translate-y-0.5">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-3">
            <span className="text-meta">{post.category}</span>
            <span className="text-cloud" aria-hidden>
              ·
            </span>
            <span className="text-meta text-slate-light">{post.date}</span>
          </div>

          <h3 className="mt-3 font-sans text-lg font-semibold leading-snug text-slate group-hover:text-clay">
            {post.title}
          </h3>

          <p className="mt-2 line-clamp-2 flex-1 font-serif text-[0.95rem] leading-relaxed text-slate-medium">
            {post.excerpt}
          </p>

          <div className="mt-5 flex items-center gap-3 border-t border-slate/10 pt-4">
            <div className="relative size-8 shrink-0 overflow-hidden rounded-full bg-ivory">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-slate">{post.author.name}</p>
              <p className="text-meta">{post.author.role}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
