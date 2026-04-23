import Link from "next/link";
import { ArrowRight, Code, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Hero() {
    return (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-24 md:py-32 text-center">
            <Badge variant="secondary" className="mb-6">
                Next.js 16 · React 19 · Tailwind CSS v4
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                모던 웹 개발의{" "}
                <span className="text-primary">시작점</span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
                Next.js, TypeScript, Tailwind CSS, ShadcnUI로 구성된 스타터킷으로
                프로덕션 레디 웹 앱을 빠르게 구축하세요.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/about" className={cn(buttonVariants({ size: "lg" }))}>
                    시작하기 <ArrowRight className="ml-2 size-4" />
                </Link>
                <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
                >
                    <Code className="mr-2 size-4" /> GitHub
                </Link>
            </div>
        </section>
    );
}
