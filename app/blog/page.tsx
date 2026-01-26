
import { blogPosts } from "@/lib/blog-data";
import { BlogCard } from "@/components/blog/blog-card";

export default function BlogIndexPage() {
    const featuredPosts = blogPosts.slice(0, 2);
    const otherPosts = blogPosts.slice(2);

    return (
        <div className="w-full">
            {/* Page Title Section */}
            <section className="pt-20 pb-12 md:pt-32 md:pb-20 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white mb-6">
                                Blog
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                Start building with Rweru. Updates, tips, and insights from the team.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="px-6 pb-24">
                <div className="max-w-[1200px] mx-auto">

                    {/* Featured Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {featuredPosts.map((post) => (
                            <div key={post.slug} className="h-full">
                                <BlogCard post={post} featured={false} /> {/* Using standard card look but bigger via grid */}
                            </div>
                        ))}
                    </div>

                    {/* Divider with Label */}
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
                        <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Latest Posts</span>
                        <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
                    </div>

                    {/* Standard Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherPosts.map((post) => (
                            <BlogCard key={post.slug} post={post} />
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
}
