"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useBoolean } from "ahooks";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submitContact } from "./actions";
import { contactSchema, type ContactFormData } from "./schema";

export function ContactForm() {
    const [loading, { setTrue: startLoading, setFalse: stopLoading }] = useBoolean(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    async function onSubmit(data: ContactFormData) {
        startLoading();
        try {
            const result = await submitContact(data);
            if (result.success) {
                toast.success("메시지가 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.");
                reset();
            } else {
                toast.error(result.error);
            }
        } catch {
            toast.error("전송 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            stopLoading();
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
                <Label htmlFor="name">이름</Label>
                <Input
                    id="name"
                    placeholder="홍길동"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                />
                {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="email">이메일</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="hello@example.com"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                />
                {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="message">메시지</Label>
                <Textarea
                    id="message"
                    placeholder="문의 내용을 입력하세요..."
                    rows={5}
                    {...register("message")}
                    aria-invalid={!!errors.message}
                />
                {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
            </div>

            <Button type="submit" disabled={loading} className="w-full">
                {loading ? "전송 중..." : "메시지 보내기"}
            </Button>
        </form>
    );
}
