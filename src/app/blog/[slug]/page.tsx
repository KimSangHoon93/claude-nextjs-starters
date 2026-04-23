import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, blogPosts } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

// Next.js 16 — params는 Promise로 비동기 접근 필수
type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};
    return {
        title: post.title,
        description: post.description,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) notFound();

    return (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
            <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
                <ArrowLeft className="size-3.5" /> 블로그 목록
            </Link>

            <article>
                <header className="mb-10">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">{post.title}</h1>
                    <p className="mt-3 text-muted-foreground">{post.description}</p>
                    <time
                        dateTime={post.date}
                        className="mt-4 block text-sm text-muted-foreground"
                    >
                        {post.date}
                    </time>
                </header>

                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-7">
                        {post.content}
                    </pre>
                </div>
            </article>
        </div>
    );
}
