import type { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
    title: "문의",
    description: "궁금한 점이 있으시면 언제든지 연락주세요.",
};

export default function ContactPage() {
    return (
        <div className="mx-auto max-w-lg px-4 sm:px-6 py-16">
            <Card>
                <CardHeader>
                    <CardTitle>문의하기</CardTitle>
                    <CardDescription>
                        궁금한 점이 있으시면 아래 양식을 작성해주세요.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm />
                </CardContent>
            </Card>
        </div>
    );
}
