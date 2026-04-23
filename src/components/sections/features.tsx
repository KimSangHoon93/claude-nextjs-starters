import {
    Zap,
    Shield,
    Palette,
    Code2,
    Moon,
    Layers,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
    {
        icon: Zap,
        title: "Next.js 16 App Router",
        description: "최신 App Router와 React Server Components로 성능 최적화된 앱을 구축하세요.",
    },
    {
        icon: Code2,
        title: "TypeScript 완전 지원",
        description: "엄격한 타입 검사로 버그를 사전에 방지하고 IDE 자동완성을 활용하세요.",
    },
    {
        icon: Palette,
        title: "Tailwind CSS v4",
        description: "OKLCH 색상 모델과 CSS 변수 기반 디자인 토큰으로 일관된 UI를 만드세요.",
    },
    {
        icon: Layers,
        title: "ShadcnUI 컴포넌트",
        description: "접근성을 갖춘 21개 UI 컴포넌트가 이미 설치되어 바로 사용 가능합니다.",
    },
    {
        icon: Moon,
        title: "다크 모드",
        description: "next-themes로 구현된 시스템 설정 연동 다크 모드가 기본 제공됩니다.",
    },
    {
        icon: Shield,
        title: "검증된 라이브러리",
        description: "ahooks, react-hook-form, zod 등 검증된 라이브러리로 빠르게 기능을 추가하세요.",
    },
];

export function Features() {
    return (
        <section className="border-t border-border bg-muted/30">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground">포함된 기능</h2>
                    <p className="mt-3 text-muted-foreground">
                        개발에 필요한 것들이 이미 준비되어 있습니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((feature) => (
                        <Card key={feature.title} className="border-border">
                            <CardHeader>
                                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                                    <feature.icon className="size-5 text-primary" />
                                </div>
                                <CardTitle className="text-base">{feature.title}</CardTitle>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
