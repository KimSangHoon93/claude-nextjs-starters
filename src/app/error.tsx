"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-32 text-center">
            <p className="text-5xl font-bold text-destructive">오류</p>
            <h1 className="mt-4 text-2xl font-bold text-foreground">문제가 발생했습니다</h1>
            <p className="mt-2 text-muted-foreground">
                {error.message || "예상치 못한 오류가 발생했습니다."}
            </p>
            <Button className="mt-8" onClick={reset}>
                다시 시도
            </Button>
        </div>
    );
}
