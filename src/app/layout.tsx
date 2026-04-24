import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
    ),
    title: {
        template: "%s | Next.js Starter",
        default: "Next.js Starter",
    },
    description: "모던 웹 개발을 위한 스타터킷. Next.js, TypeScript, Tailwind CSS, ShadcnUI로 빠르게 시작하세요.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="ko"
            suppressHydrationWarning
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col bg-background text-foreground">
                <Providers>
                    <SiteHeader />
                    <main className="flex-1">{children}</main>
                    <SiteFooter />
                </Providers>
            </body>
        </html>
    );
}
