import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
    {
        slug: "getting-started",
        title: "Next.js Starter로 프로젝트 시작하기",
        description: "이 스타터킷을 활용하여 Next.js 프로젝트를 빠르게 시작하는 방법을 알아봅니다.",
        date: "2026-04-23",
        tags: ["Next.js", "TypeScript", "시작하기"],
        content: `# Next.js Starter로 프로젝트 시작하기

이 스타터킷은 Next.js 16, React 19, Tailwind CSS v4, ShadcnUI를 기반으로 구성되어 있습니다.

## 주요 기능

- **App Router**: Next.js의 최신 라우팅 시스템
- **TypeScript**: 완전한 타입 지원
- **다크 모드**: next-themes 기반 시스템 연동

## 시작 방법

\`\`\`bash
git clone <repo-url>
npm install
npm run dev
\`\`\`
`,
    },
    {
        slug: "tailwind-v4-guide",
        title: "Tailwind CSS v4 핵심 변경사항",
        description: "Tailwind CSS v4의 주요 변경사항과 OKLCH 색상 모델 활용법을 살펴봅니다.",
        date: "2026-04-20",
        tags: ["Tailwind CSS", "CSS", "디자인"],
        content: `# Tailwind CSS v4 핵심 변경사항

Tailwind CSS v4는 여러 중요한 변경사항을 가져왔습니다.

## 주요 변경사항

- \`@import "tailwindcss"\` 단일 import
- \`tailwind.config.js\` 파일 불필요
- OKLCH 색상 모델 지원
- CSS 변수 기반 디자인 토큰
`,
    },
    {
        slug: "shadcn-base-nova",
        title: "ShadcnUI base-nova 스타일 가이드",
        description: "ShadcnUI의 새로운 base-nova 스타일과 Base UI 컴포넌트를 활용하는 방법을 알아봅니다.",
        date: "2026-04-15",
        tags: ["ShadcnUI", "UI", "컴포넌트"],
        content: `# ShadcnUI base-nova 스타일 가이드

base-nova는 ShadcnUI의 최신 스타일로, @base-ui/react를 기반으로 합니다.

## 특징

- Headless UI 기반으로 완전한 커스터마이징 가능
- 접근성(a11y) 내장
- TypeScript 완전 지원
`,
    },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug);
}
