# Development Guidelines

## Project Overview

- Next.js 16.2.4 App Router + React 19.2.4 + TypeScript 5 strict 풀스택 스타터
- 경로 별칭: `@/*` → `src/*`
- 테스트 러너 없음 (jest/vitest 미설치)

## Project Architecture

```
src/
├── app/           # 페이지, 레이아웃, API routes, 서버 액션
├── components/
│   ├── layout/    # SiteHeader, SiteFooter, MobileNav
│   ├── sections/  # 페이지 섹션 컴포넌트
│   └── ui/        # shadcn/ui 컴포넌트 (직접 편집 가능)
├── config/        # site.ts — siteConfig 상수
├── lib/           # utils.ts (cn), data.ts (정적 블로그 데이터)
└── types/         # 공유 TypeScript 타입
```

### 핵심 파일 역할

| 파일 | 역할 |
|------|------|
| `src/config/site.ts` | 네비게이션·메타·SNS 단일 진실 공급원 |
| `src/lib/data.ts` | 블로그 포스트 정적 배열 (DB 없음) |
| `src/lib/utils.ts` | `cn()` 유틸리티 |
| `src/components/providers.tsx` | ThemeProvider + TooltipProvider + Toaster 클라이언트 래퍼 |
| `src/app/globals.css` | OKLCH 색상 토큰, Tailwind v4 테마 정의 |

## Code Standards

- 들여쓰기: 스페이스 2칸
- 변수명: camelCase
- 함수명: 동사로 시작 (예: `getPostBySlug`, `handleSubmit`)
- 한글 주석 사용
- `className`은 **반드시** `cn()` 사용 — `import { cn } from "@/lib/utils"`
- variant 패턴은 CVA(`class-variance-authority`) 사용

## Functionality Implementation Standards

### 새 페이지 추가

```
src/app/[route]/
├── page.tsx          # 필수
├── schema.ts         # 폼이 있을 때만
├── actions.ts        # 서버 액션이 있을 때만
└── [route]-form.tsx  # 클라이언트 폼 컴포넌트
```

- `contact/` 디렉토리가 완성된 참조 구현 — 새 폼 페이지 작성 전 반드시 참조
- 서버 컴포넌트 기본값 → 훅/이벤트 필요 시만 파일 상단에 `"use client"` 추가

### 블로그 포스트 추가/수정

- **`src/lib/data.ts`의 `blogPosts` 배열만 수정** — 외부 CMS/DB 없음
- `getPostBySlug()` 함수는 이 배열을 조회

### 네비게이션 변경

- **`src/config/site.ts`의 `siteConfig.nav` 배열만 수정**
- SiteHeader와 MobileNav 모두 이 배열을 참조하므로 별도 수정 불필요

### 서버 액션 패턴

```typescript
"use server"
// schema.ts의 Zod 스키마로 safeParse 검증 후 처리
const parsed = schema.safeParse(data)
if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }
```

## Framework/Plugin/Third-party Library Usage Standards

### Tailwind CSS v4

- **`tailwind.config.js` 생성 금지** — v4는 설정 파일 불필요
- 색상·반경 등 디자인 토큰 변경: `src/app/globals.css`의 `:root` / `.dark` 블록 수정
- 색상 모델: OKLCH (`oklch(L C H)`)
- 새 토큰 추가: `@theme inline { }` 블록에 CSS 변수 매핑 추가

### shadcn/ui (base-nova 스타일)

- **`@base-ui/react` 기반 — Radix UI API와 다름**
- **`@radix-ui/*` import 금지**
- 새 컴포넌트 추가: `npx shadcn@latest add <컴포넌트명>`
- 설치된 컴포넌트는 `src/components/ui/`에 위치하며 직접 편집 가능
- 컴포넌트 API 확인: `node_modules/@base-ui/react/` 타입 참조

### Zod v4

- **v3 문법 사용 금지** — v4는 일부 API 변경됨
- 스키마 정의 전 `node_modules/zod/` 타입 확인

### react-hook-form

- 반드시 `zodResolver` 연동: `import { zodResolver } from "@hookform/resolvers/zod"`

### ahooks

- 공통 React 훅 유틸리티 — 커스텀 훅 작성 전 ahooks에 동일 기능 있는지 확인

## Key File Interaction Standards

| 작업 | 수정 파일 |
|------|-----------|
| 네비게이션 항목 추가/삭제 | `src/config/site.ts` |
| 다크/라이트 색상 변경 | `src/app/globals.css` `:root` / `.dark` |
| 블로그 포스트 추가/수정 | `src/lib/data.ts` |
| 전역 공급자 추가 | `src/components/providers.tsx` |
| 새 shadcn 컴포넌트 | `npx shadcn@latest add` → `src/components/ui/` 자동 생성 |
| 공유 타입 추가 | `src/types/index.ts` |

## AI Decision-making Standards

### 컴포넌트 타입 결정 트리

```
클라이언트 훅(useState, useEffect 등) 필요?
├── YES → "use client" 추가
└── NO → 서버 컴포넌트로 작성 (async function 사용 가능)
```

### 스타일 적용 결정 트리

```
조건부 클래스 필요?
├── YES → cn("base", condition && "conditional") 사용
└── NO → cn("base-class") 사용 (직접 문자열 금지)

variant 필요?
├── YES → CVA 패턴 사용
└── NO → cn() 단독 사용
```

### 폼 구현 결정 트리

```
서버 액션 필요?
├── YES → schema.ts + actions.ts + *-form.tsx 3파일 패턴
└── NO → 클라이언트 전용 폼 (login-form.tsx 참조)
```

## Prohibited Actions

- `tailwind.config.js` 파일 생성 금지
- `@radix-ui/*` 패키지 import 금지
- Zod v3 전용 문법 사용 금지 (`z.string().email()` 등 v4 API 확인 필수)
- `className`에 `cn()` 미사용 금지 (조건부 여부 무관)
- 네비게이션을 SiteHeader/MobileNav에 하드코딩 금지 (반드시 siteConfig 경유)
- 커밋 전 `npm run lint` 생략 금지
- `src/components/providers.tsx` 외부에 전역 Provider 직접 삽입 금지
- 블로그 데이터 page.tsx에 하드코딩 금지 (반드시 lib/data.ts 경유)
