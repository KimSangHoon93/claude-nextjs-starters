"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useMount } from "ahooks";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // SSR 안전 — hydration 불일치 방지
    useMount(() => setMounted(true));

    if (!mounted) return <div className="size-9" />;

    return (
        <Button
            variant="ghost"
            size="icon"
            aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
    );
}
