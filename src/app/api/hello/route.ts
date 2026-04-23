import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: "안녕하세요! Next.js Starter API입니다.",
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
}
