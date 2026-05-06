import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="mx-auto max-w-4xl px-4 py-16 space-y-6">
            {/* 헤더 */}
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-8 w-24 rounded-full" />
            </div>

            {/* 발신/수신 정보 */}
            <div className="grid grid-cols-2 gap-8 mt-8">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>

            {/* 항목 테이블 */}
            <div className="mt-8 space-y-2">
                <Skeleton className="h-10 w-full rounded-lg" />
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-lg" />
                ))}
            </div>

            {/* 합계 */}
            <div className="flex justify-end mt-4">
                <div className="space-y-2 w-64">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            </div>
        </div>
    );
}
