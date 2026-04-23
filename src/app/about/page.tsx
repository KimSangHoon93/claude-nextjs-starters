import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
    title: "소개",
    description: "Next.js Starter 프로젝트에 대해 알아보세요.",
};

const techStack = [
    { category: "프레임워크", items: ["Next.js 16", "React 19"] },
    { category: "언어", items: ["TypeScript"] },
    { category: "스타일링", items: ["Tailwind CSS v4", "ShadcnUI", "lucide-react"] },
    { category: "상태/훅", items: ["ahooks", "next-themes"] },
    { category: "폼", items: ["react-hook-form", "zod"] },
    { category: "빌드", items: ["Turbopack", "ESLint"] },
];

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
            <h1 className="text-3xl font-bold text-foreground">소개</h1>
            <p className="mt-4 text-muted-foreground leading-7">
                이 스타터킷은 Next.js 기반 웹 프로젝트를 빠르게 시작할 수 있도록 설계되었습니다.
                최신 기술 스택과 검증된 라이브러리를 조합하여, 보일러플레이트 작성에 드는 시간을
                최소화하고 비즈니스 로직 개발에 집중할 수 있도록 합니다.
            </p>

            <Separator className="my-10" />

            <h2 className="text-xl font-semibold text-foreground mb-6">기술 스택</h2>
            <div className="space-y-5">
                {techStack.map(({ category, items }) => (
                    <div key={category} className="flex flex-col sm:flex-row sm:items-start gap-2">
                        <span className="w-28 shrink-0 text-sm font-medium text-muted-foreground pt-0.5">
                            {category}
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {items.map((item) => (
                                <Badge key={item} variant="secondary">
                                    {item}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <Separator className="my-10" />

            <h2 className="text-xl font-semibold text-foreground mb-4">핵심 원칙</h2>
            <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                    <span className="text-primary font-bold">·</span>
                    <span>바퀴를 재발명하지 않는다 — 유명 라이브러리를 적극 활용</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-primary font-bold">·</span>
                    <span>디자인 토큰 사용 — 팔레트 직접 참조 대신 CSS 변수 기반 토큰</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-primary font-bold">·</span>
                    <span>Server/Client 분리 — RSC 우선, 필요한 곳만 Client Component</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-primary font-bold">·</span>
                    <span>접근성 — ShadcnUI 컴포넌트의 내장 a11y 활용</span>
                </li>
            </ul>
        </div>
    );
}
