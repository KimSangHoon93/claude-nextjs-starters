"use server";

import { contactSchema, type ContactFormData } from "./schema";

export type { ContactFormData };

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
