"use server";

import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
    email: z.string().email("올바른 이메일 주소를 입력하세요."),
    message: z.string().min(10, "메시지는 10자 이상이어야 합니다."),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactActionResult =
    | { success: true }
    | { success: false; error: string };

export async function submitContact(data: ContactFormData): Promise<ContactActionResult> {
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message };
    }

    // 실제 서비스에서는 이메일 전송 또는 DB 저장 로직을 여기에 구현합니다.
    await new Promise((resolve) => setTimeout(resolve, 500));

    return { success: true };
}
