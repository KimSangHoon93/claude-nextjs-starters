import type { Metadata } from "next";

type Props = {
    params: Promise<{ notionPageId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { notionPageId } = await params;
    return {
        title: `견적서 ${notionPageId}`,
        description: "견적서 상세 조회",
    };
}

export default async function InvoicePage({ params }: Props) {
    const { notionPageId } = await params;

    return (
        <div className="mx-auto max-w-4xl px-4 py-16">
            <h1 className="text-3xl font-bold text-foreground">견적서</h1>
            <p className="mt-2 text-sm text-muted-foreground">ID: {notionPageId}</p>
            {/* TODO: Task 008에서 실제 Notion API 연결 */}
        </div>
    );
}
