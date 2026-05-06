# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

# 프로젝트 개요

Next.js 스타터 템플릿 — 현대적 풀스택 웹 앱 구조 학습·참고용.

# 기술 스택

| 분류 | 버전/라이브러리 |
|------|----------------|
| 프레임워크 | Next.js **16.2.4** / React **19.2.4** |
| 언어 | TypeScript 5 (strict) |
| 스타일링 | Tailwind CSS **4** (PostCSS, `tailwind.config.js` 없음) |
| UI 컴포넌트 | shadcn/ui `base-nova` 스타일 (`@base-ui/react` 기반, Radix UI 아님) |
| 폼 & 검증 | react-hook-form + zod 4 |
| 유틸 훅 | ahooks |
| 테마 | next-themes (OKLCH 색상 변수) |
| 토스트 | sonner |

> ⚠️ Tailwind v4 / shadcn(`base-nova`) / Zod v4 모두 Breaking Change 있음.
> 코드 작성 전 `node_modules/` 내 타입 및 API 확인 필수.
> shadcn `base-nova`는 `@base-ui/react` 헤드리스 기반 — Radix UI API와 다름.

# 개발 명령어

```bash
npm run dev    # 개발 서버 (localhost:3000)
npm run build  # 프로덕션 빌드
npm run lint   # ESLint — 커밋 전 반드시 실행
```

테스트 설정 없음 (jest/vitest 미포함).

# 아키텍처

## 앱 레이어

`src/app/layout.tsx`가 루트 레이아웃으로, `<Providers>` → `<SiteHeader>` → `<main>` → `<SiteFooter>` 구조.
`src/components/providers.tsx`는 클라이언트 경계로, `ThemeProvider` + `TooltipProvider` + `Toaster`를 한 번에 래핑.

## 데이터

현재 외부 DB/CMS 없음. 블로그 게시물은 `src/lib/data.ts`에 정적 배열로 저장.
실제 서비스 연동 시 이 파일을 교체 지점으로 사용.

## 사이트 설정

네비게이션·메타 정보·SNS 링크는 `src/config/site.ts`의 `siteConfig` 객체 하나로 관리.

## 테마 & 색상

`globals.css`에 OKLCH 기반 CSS 변수로 라이트/다크 토큰 정의. `tailwind.config.js` 대신 `@theme inline` 블록으로 Tailwind에 연결. 색상 커스터마이징은 이 파일의 `:root` / `.dark` 블록 수정.

# 핵심 패턴

## 스타일링

```typescript
// 항상 cn() 사용 — src/lib/utils.ts
import { cn } from "@/lib/utils"
className={cn("base-class", condition && "conditional-class")}

// variant는 CVA 패턴
import { cva } from "class-variance-authority"
```

## 컴포넌트

- 서버 컴포넌트가 기본값 (async function 가능)
- 클라이언트 훅/이벤트 필요 시 파일 상단에 `"use client"` 명시
- shadcn UI 추가: `npx shadcn@latest add <컴포넌트명>`

## 폼 & 서버 액션 (3-파일 패턴)

```
[route]/schema.ts    — Zod 스키마 정의
[route]/actions.ts   — "use server" + safeParse 검증
[route]/*-form.tsx   — "use client" + useForm + zodResolver
```

`contact/` 디렉토리가 완성된 참조 구현.

## API Route

```typescript
// src/app/api/[path]/route.ts
import { NextResponse } from "next/server"
export async function GET() {
  return NextResponse.json({ ... })
}
```

경로 별칭: `@/*` → `src/*`

# Claude Code 통합

## 커스텀 에이전트

| 에이전트 | 트리거 시점 |
|---------|------------|
| `code-reviewer` | 기능/함수 구현 완료 후 자동 실행 |
| `development-planner` | ROADMAP.md 생성·수정 요청 시 |
| `nextjs-app-developer` | Next.js 앱 구조·라우팅·레이아웃 설계 시 |
| `prd-generator` | 새 프로젝트 PRD 생성 요청 시 |
| `prd-validator` | PRD 기술적 검증 요청 시 |
| `starter-cleaner` | 스타터 킷 초기화 요청 시 |
| `ui-markup-specialist` | UI 컴포넌트 마크업·스타일링 작업 시 |

## 훅 (Slack 알림)

- **permission_prompt** → `#claude-code` 채널에 권한 요청 알림
- **Stop** → `#claude-code` 채널에 작업 완료 알림
- Webhook URL: `.claude/.env`의 `SLACK_WEBHOOK_URL`

## MCP

- **Playwright**: 자동 허용 (`mcp__playwright` 권한 등록됨)
