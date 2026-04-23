import Link from "next/link";
import { Code, Globe } from "lucide-react";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* 브랜드 */}
                    <div className="flex flex-col items-center sm:items-start gap-1">
                        <Link href="/" className="flex items-center gap-1.5 font-semibold text-foreground">
                            <span className="text-primary">▲</span>
                            <span>{siteConfig.name}</span>
                        </Link>
                        <p className="text-xs text-muted-foreground">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>

                    {/* 내비게이션 */}
                    <nav className="flex items-center gap-4">
                        {siteConfig.nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* 소셜 링크 */}
                    <div className="flex items-center gap-2">
                        <Link
                            href={siteConfig.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Code className="size-4" />
                        </Link>
                        <Link
                            href={siteConfig.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Globe className="size-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
