"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useBoolean } from "ahooks";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";

export function MobileNav() {
    const [open, { setTrue, setFalse }] = useBoolean(false);

    return (
        <Sheet open={open} onOpenChange={(isOpen) => (isOpen ? setTrue() : setFalse())}>
            {/* SheetTrigger는 render prop으로 Button과 합성 */}
            <SheetTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        aria-label="메뉴 열기"
                        onClick={setTrue}
                    />
                }
            >
                <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
                <SheetHeader>
                    <SheetTitle className="text-left">{siteConfig.name}</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-1">
                    {siteConfig.nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={setFalse}
                            className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
