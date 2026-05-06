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
        <div className="mx-auto max-w-4xl px-4 py-32 text-center">
            <p className="text-5xl font-bold text-destructive">오류</p>
            <h1 className="mt-4 text-2xl font-bold text-foreground">견적서를 불러올 수 없습니다</h1>
            <p className="mt-2 text-muted-foreground">
                {process.env.NODE_ENV === "development"
                    ? error.message
                    : "견적서를 불러오는 중 오류가 발생했습니다."}
            </p>
            <Button className="mt-8" onClick={reset}>
                다시 시도
            </Button>
        </div>
    );
}
