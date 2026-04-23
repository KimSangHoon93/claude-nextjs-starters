import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
                {/* 로고 */}
                <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
                    <span className="text-primary">▲</span>
                    <span>{siteConfig.name}</span>
                </Link>

                {/* 데스크탑 내비게이션 */}
                <nav className="hidden md:flex items-center gap-1">
                    {siteConfig.nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* 우측 액션 */}
                <div className="flex items-center gap-1">
                    <ThemeToggle />
                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
