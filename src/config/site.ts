export const siteConfig = {
    name: "Next.js Starter",
    description: "모던 웹 개발을 위한 스타터킷. Next.js, TypeScript, Tailwind CSS, ShadcnUI로 빠르게 시작하세요.",
    url: "https://example.com",
    nav: [
        { label: "홈", href: "/" },
        { label: "블로그", href: "/blog" },
        { label: "소개", href: "/about" },
        { label: "문의", href: "/contact" },
    ],
    social: {
        github: "https://github.com",
        twitter: "https://twitter.com",
    },
} as const;
