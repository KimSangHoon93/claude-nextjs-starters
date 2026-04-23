import { Badge } from "@/components/ui/badge";

const stack = [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Tailwind CSS v4",
    "ShadcnUI",
    "ahooks",
    "react-hook-form",
    "zod",
    "next-themes",
    "lucide-react",
];

export function TechStack() {
    return (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">기술 스택</h2>
            <div className="flex flex-wrap justify-center gap-2">
                {stack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-sm px-3 py-1">
                        {tech}
                    </Badge>
                ))}
            </div>
        </section>
    );
}
