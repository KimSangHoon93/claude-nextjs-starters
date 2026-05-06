import { cn } from "@/lib/utils";

export default function InvoiceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={cn("min-h-screen bg-background")}>
            {children}
        </div>
    );
}
