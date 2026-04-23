import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CTA() {
    return (
        <section className="border-t border-border bg-primary text-primary-foreground">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 text-center">
                <h2 className="text-3xl font-bold">지금 바로 시작하세요</h2>
                <p className="mt-4 text-primary-foreground/70 max-w-xl mx-auto">
                    클론하고, 커스터마이즈하고, 배포하세요. 모든 준비가 완료되어 있습니다.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/contact"
                        className={cn(buttonVariants({ size: "lg", variant: "secondary" }))}
                    >
                        문의하기 <ArrowRight className="ml-2 size-4" />
                    </Link>
                    <Link
                        href="/blog"
                        className={cn(
                            buttonVariants({ size: "lg", variant: "ghost" }),
                            "text-primary-foreground hover:bg-primary-foreground/10"
                        )}
                    >
                        블로그 보기
                    </Link>
                </div>
            </div>
        </section>
    );
}
