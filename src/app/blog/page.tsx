import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "블로그",
    description: "Next.js, TypeScript, Tailwind CSS에 관한 글을 확인하세요.",
};

export default function BlogPage() {
    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
            <div className="mb-12">
                <h1 className="text-3xl font-bold text-foreground">블로그</h1>
                <p className="mt-2 text-muted-foreground">
                    개발 팁과 기술 가이드를 공유합니다.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                        <Card className="h-full transition-shadow hover:shadow-md">
                            <CardHeader>
                                <div className="flex flex-wrap gap-1.5 mb-2">
                                    {post.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                    {post.title}
                                </CardTitle>
                                <CardDescription>{post.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <time dateTime={post.date}>{post.date}</time>
                                    <span className="flex items-center gap-1 group-hover:text-primary transition-colors">
                                        읽기 <ArrowRight className="size-3" />
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
