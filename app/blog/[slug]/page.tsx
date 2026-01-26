
import Image from "next/image";
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
        return { title: 'Post Not Found' };
    }
    return {
        title: `${post.title} - Rweru Blog`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen">
            {/* Header / Hero */}
            <header className="pt-20 pb-12 px-6 bg-white dark:bg-background-dark">
                <div className="max-w-3xl mx-auto text-center">

                    <div className="inline-flex items-center gap-2 mb-8">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                            {post.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                            {post.date}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-3">
                        <div className="relative size-10 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-800">
                            <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-bold text-gray-900 dark:text-white">{post.author.name}</div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{post.author.role}</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            <div className="px-6 mb-16">
                <div className="max-w-[1000px] mx-auto aspect-[2/1] relative rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-24">
                <div className="max-w-2xl mx-auto prose prose-lg prose-slate dark:prose-invert">
                    <p className="lead text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 mb-10 border-l-4 border-blue-500 pl-6 not-italic">
                        {post.excerpt}
                    </p>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                    <h2>The Main Point</h2>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <figure>
                        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop" alt="Technology concept" className="rounded-xl shadow-lg my-8" />
                        <figcaption className="text-center text-sm text-gray-500">Fig. 1: A visualization of the system architecture.</figcaption>
                    </figure>

                    <h3>Why it matters</h3>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>

                    <ul>
                        <li>Speed is a feature.</li>
                        <li>Reliability is paramount.</li>
                        <li>Developer experience matters.</li>
                    </ul>

                    <p>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    </p>
                </div>

                {/* Back Link */}
                <div className="max-w-2xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Back to Blog
                    </Link>
                </div>
            </div>
        </article>
    );
}
