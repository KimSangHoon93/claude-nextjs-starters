import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function BlogPostNotFound() {
    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-32 text-center">
            <p className="text-5xl font-bold text-muted-foreground">404</p>
            <h1 className="mt-4 text-2xl font-bold text-foreground">포스트를 찾을 수 없어요</h1>
            <p className="mt-2 text-muted-foreground">요청하신 블로그 포스트가 존재하지 않습니다.</p>
            <Link href="/blog" className={`mt-8 inline-flex ${buttonVariants()}`}>
                블로그 목록으로
            </Link>
        </div>
    );
}
