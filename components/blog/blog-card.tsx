
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
    post: BlogPost;
    featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block h-full">
            <article className={`
        relative flex flex-col h-full overflow-hidden rounded-2xl bg-white dark:bg-gray-900 
        border border-gray-200 dark:border-gray-800 
        transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700
        ${featured ? 'md:grid md:grid-cols-2 md:gap-8' : ''}
      `}>
                {/* Image Container */}
                <div className={`
          relative overflow-hidden bg-gray-100 dark:bg-gray-800
          ${featured ? 'aspect-[16/9] md:aspect-auto md:h-full' : 'aspect-[16/9]'}
        `}>
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                {/* Content Container */}
                <div className={`flex flex-col flex-1 p-6 ${featured ? 'md:py-8 md:pr-8 md:pl-0 md:justify-center' : ''}`}>

                    <div className="flex items-center gap-3 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                            {post.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {post.date}
                        </span>
                    </div>

                    <h3 className={`font-bold text-gray-900 dark:text-white leading-tight mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                        {post.title}
                    </h3>

                    <div className="mb-6">
                        <p className="inline text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                            <span className="text-gray-900 dark:text-gray-200 font-bold mr-1">TL;DR:</span>
                            {post.excerpt.replace("TL;DR: ", "")}
                        </p>
                    </div>

                    <div className="mt-auto flex items-center gap-3">
                        <div className="relative size-8 rounded-full overflow-hidden bg-gray-200 ring-2 ring-white dark:ring-gray-800">
                            <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-900 dark:text-white">
                                {post.author.name}
                            </span>
                            <span className="text-[10px] uppercase tracking-wide font-medium text-gray-500 dark:text-gray-400">
                                {post.author.role}
                            </span>
                        </div>
                    </div>

                </div>
            </article>
        </Link>
    );
}
