import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-32 text-center">
            <p className="text-8xl font-bold text-muted-foreground/30">404</p>
            <h1 className="mt-4 text-2xl font-bold text-foreground">페이지를 찾을 수 없어요</h1>
            <p className="mt-2 text-muted-foreground">
                요청하신 페이지가 존재하지 않거나 이동되었습니다.
            </p>
            <Link href="/" className={`mt-8 inline-flex ${buttonVariants()}`}>
                홈으로 돌아가기
            </Link>
        </div>
    );
}
