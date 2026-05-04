@AGENTS.md

# Project Context

- PRD 문서: @docs/PRD.md
- 개발 로드맵: @docs/ROADMAP.md

# 프로젝트 개요

Next.js 스타터 템플릿 — 현대적 풀스택 웹 앱 구조 학습·참고용.

# 기술 스택

| 분류 | 버전/라이브러리 |
|------|----------------|
| 프레임워크 | Next.js **16.2.4** / React **19.2.4** |
| 언어 | TypeScript 5 (strict) |
| 스타일링 | Tailwind CSS **4** (PostCSS) |
| UI 컴포넌트 | shadcn/ui (@base-ui/react 기반) + lucide-react |
| 폼 & 검증 | react-hook-form + zod 4 |
| 테마 | next-themes |
| 토스트 | sonner |

> ⚠️ Tailwind v4 / shadcn(@base-ui) / Zod v4 모두 Breaking Change 있음.
> 코드 작성 전 `node_modules/` 내 타입 및 API 확인 필수.

# 디렉토리 구조

```
src/
├── app/           # App Router — 페이지, 레이아웃, API routes, 서버 액션
│   ├── api/       # route.ts 파일로 REST 엔드포인트 정의
│   └── [route]/   # page.tsx, actions.ts, schema.ts 같은 위치에 배치
├── components/
│   ├── layout/    # SiteHeader, SiteFooter, MobileNav
│   ├── sections/  # 페이지 섹션 컴포넌트
│   └── ui/        # shadcn/ui 컴포넌트 (직접 편집 가능)
├── config/        # site.ts — siteConfig 상수
├── lib/           # utils.ts (cn), data.ts
└── types/         # 공유 TypeScript 타입
```

경로 별칭: `@/*` → `src/*`

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

## 폼 & 서버 액션

```typescript
// schema.ts — Zod 스키마 정의
// actions.ts — "use server" 선언 후 safeParse로 검증
// *-form.tsx — "use client" + useForm + zodResolver
```

## API Route

```typescript
// src/app/api/[path]/route.ts
import { NextResponse } from "next/server"
export async function GET() {
  return NextResponse.json({ ... })
}
```

# 개발 명령어

```bash
npm run dev    # 개발 서버 (localhost:3000)
npm run build  # 프로덕션 빌드
npm run lint   # ESLint — 커밋 전 반드시 실행
```

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
