# Notion CMS 기반 개인 개발 블로그 개발 로드맵

> Notion을 CMS로 활용해 글 작성·발행 워크플로우를 단순화한 1인 개발자용 기술 블로그 MVP 구축 로드맵

## 개요

본 프로젝트는 **Notion에서 작성한 글이 별도 관리 없이 자동으로 블로그에 반영되는** 1인 개발자용 기술 블로그입니다. 다음 핵심 가치를 제공합니다.

- **Notion CMS 연동**: 글 작성·발행을 Notion 워크플로우 안에서 해결
- **자동 반영**: ISR을 통한 빌드 없이 최신 글 자동 갱신
- **개발자 친화 UX**: 다크모드, 코드 신택스 하이라이팅, 반응형 레이아웃 기본 지원

---

## 개발 워크플로우

1. **작업 계획**: 기존 코드베이스 파악 → `ROADMAP.md`에 새 작업 추가 (마지막 완료 작업 다음에 삽입)
2. **작업 생성**: `/tasks/XXX-description.md` 형식으로 작업 파일 생성, API/비즈니스 로직 작업은 "## 테스트 체크리스트" 섹션 필수 포함
3. **작업 구현**: 작업 파일 명세 준수 → API 연동 시 Playwright MCP로 E2E 테스트 → 단계별 진행 상황 업데이트
4. **로드맵 업데이트**: 완료 작업을 ✅로 표시하고 `See: /tasks/XXX-xxx.md` 참조 추가

---

## 진행 상태 표기

- ⬜ 미완료
- 🔄 진행중
- ✅ 완료

---

## Phase 1: 프로젝트 초기 설정

> **목적**: Next.js 프로젝트 구조를 정리하고 Notion API 연동을 위한 환경과 기본 레이아웃 골격을 구축합니다.
> **이 순서인 이유**: 견고한 기반(환경 변수, 라우트 구조, 레이아웃 골격) 없이는 이후 단계의 기능 개발이 어렵고 시행착오가 늘어납니다. 코드 작성 전 환경부터 확정합니다.
> **예상 소요 시간**: 1~2일
> **완료 기준**: 모든 기본 라우트가 빈 페이지로 정상 렌더링되고, Notion API 클라이언트 인스턴스가 환경 변수와 함께 동작합니다.

### TASK-001: ⬜ Next.js 프로젝트 구조 설정 — 우선순위

- [ ] `starter-cleaner` 에이전트로 스타터 데모 페이지·컴포넌트 제거
- [ ] `package.json`의 `name`, `description`, `author` 필드를 블로그 정보로 교체
- [ ] `src/config/site.ts`의 `siteConfig` 상수를 블로그명·설명·OG 기본값으로 갱신
- [ ] `README.md` 초기화 (블로그 프로젝트 설명으로 교체)
- [ ] `src/app/page.tsx` — 홈 페이지 빈 껍데기 (Hello Blog 텍스트만 표시)
- [ ] `src/app/posts/[slug]/page.tsx` — 글 상세 페이지 빈 껍데기 (params.slug 표시)
- [ ] `src/app/category/[name]/page.tsx` — 카테고리 페이지 빈 껍데기 (params.name 표시)
- [ ] `src/app/not-found.tsx` 404 페이지 골격
- [ ] `npm run lint` 통과 확인

### TASK-002: ⬜ Notion API 연동 환경 구축

- [ ] `@notionhq/client`, `notion-to-md`, `react-syntax-highlighter` 패키지 설치
- [ ] `.env.local.example` 파일 생성 (`NOTION_API_KEY`, `NOTION_DATABASE_ID` 키 정의)
- [ ] `.env.local` 파일 생성 및 `.gitignore` 등록 확인
- [ ] `src/lib/notion/client.ts`에 Notion 클라이언트 인스턴스 정의
- [ ] 환경 변수 누락 시 명확한 에러 메시지 throw
- [ ] 임시 스크립트 또는 API route로 `client.databases.query` 호출 1회 성공 검증

#### 테스트 체크리스트
- [ ] Playwright MCP로 임시 검증 페이지 접속 → Notion DB 응답이 정상 수신되는지 확인
- [ ] 환경 변수가 비어있을 때 명확한 에러 메시지 노출 확인

### TASK-003: ⬜ 기본 레이아웃 구조 생성

- [ ] `src/app/layout.tsx`에 헤더·푸터 슬롯 마크업 추가 (실제 컴포넌트는 Phase 2에서 주입)
- [ ] `src/components/layout/` 디렉토리 생성 및 placeholder 컴포넌트 파일 배치
- [ ] `src/app/globals.css`의 색상 토큰 및 base 스타일을 블로그 톤에 맞게 조정
- [ ] 모든 라우트가 200 OK로 응답하는지 `npm run dev`로 확인
- [ ] 페이지별 기본 max-width, padding 등 베이스 컨테이너 스타일 정의

---

## Phase 2: 공통 모듈 개발

> **목적**: 모든 기능에서 재사용될 Notion API 공통 함수, 공통 컴포넌트, 공통 타입을 먼저 구축하여 이후 페이지 구현 시 중복을 방지합니다.
> **이 순서인 이유**: 모든 기능에서 재사용되는 코드(Notion fetch 함수, Card/Header/Footer, Post/Category 타입)를 먼저 만들어야 Phase 3에서 페이지를 빠르게 조립할 수 있고 중복 작성이 발생하지 않습니다.
> **예상 소요 시간**: 2~3일
> **완료 기준**: `fetchPages`, `fetchPageContent`가 실제 Notion DB로부터 데이터를 정상 반환하고, Header·Footer·Card 컴포넌트가 타입 안전하게 동작합니다.

### TASK-004: ⬜ 공통 타입 정의 (Post, Category) — 우선순위

- [ ] `src/types/post.ts` — `Post`, `PostSummary`, `PostStatus` 타입 정의 (id, slug, title, summary, category, tags, publishedAt, coverImage 등)
- [ ] `src/types/category.ts` — `Category` 타입 정의 (name, slug, count)
- [ ] `src/types/notion-block.ts` — `NotionBlock`, `RichText` 타입 정의 (paragraph, heading_1~3, code, image, bulleted_list, numbered_list, quote 지원)
- [ ] Notion 응답 → `Post`/`Category`로 변환하는 매퍼 함수 시그니처 작성 (`mapNotionPageToPost`, `mapNotionSelectToCategory`)
- [ ] 타입 export 정리 (`src/types/index.ts` barrel)

### TASK-005: ⬜ Notion API 공통 함수 (fetchPages, fetchPageContent)

- [ ] `src/lib/notion/fetch-pages.ts` — `fetchPages(options)` 구현
  - Status=발행됨 필터, 발행일(publishedAt) 내림차순 정렬
  - 카테고리·태그 옵션 인자 지원 (선택적 필터)
  - 페이지네이션(`start_cursor`, `has_more`) 처리
  - Notion 응답을 `Post[]`로 매핑
- [ ] `src/lib/notion/fetch-page-content.ts` — `fetchPageContent(pageId)` 구현
  - 페이지 메타정보 + 자식 블록 전체 조회
  - 100건 limit 페이지네이션 처리
  - 중첩 블록(toggle, callout 등) children 재귀 조회
  - Notion 블록 → 내부 `NotionBlock[]` 변환
- [ ] `src/lib/notion/fetch-categories.ts` — `fetchCategories()` 구현
  - DB select 옵션 또는 발행 글에서 카테고리 집계
- [ ] API 호출 실패 시 일관된 에러 처리 및 로깅 유틸 작성
- [ ] 단순 캐시 메모이제이션 (`React.cache`) 적용

#### 테스트 체크리스트
- [ ] Playwright MCP로 임시 검증 라우트 접속 → `fetchPages` 응답이 PRD F001 명세(Status=발행됨, 발행일 내림차순)와 일치하는지 확인
- [ ] `fetchPageContent`가 모든 블록 타입(paragraph, heading, code, image, list, quote)을 누락 없이 반환하는지 확인
- [ ] 100건 초과 글에 대한 페이지네이션 동작 확인
- [ ] Notion API 키 무효 시 에러 핸들링 동작 확인

### TASK-006: ⬜ 공통 컴포넌트 (Header, Footer, Card)

- [ ] `npx shadcn@latest add badge card button input` 실행 (필요한 shadcn 컴포넌트 설치)
- [ ] `src/components/layout/site-header.tsx` — 로고, 카테고리 메뉴(`fetchCategories` 사용), 검색 진입점, 다크모드 토글 (F012)
- [ ] `src/components/layout/site-footer.tsx` — 저작권·소셜 링크
- [ ] `src/components/layout/theme-provider.tsx` — `next-themes` 래퍼 (`defaultTheme="system"`, `enableSystem`)
- [ ] `src/components/layout/theme-toggle.tsx` — 라이트/다크 토글 버튼 (Sun/Moon 아이콘)
- [ ] `src/components/post/post-card.tsx` — 제목·카테고리 뱃지·발행일·태그·요약 표시 (`Post` 타입 props)
- [ ] `src/components/post/post-meta.tsx` — 상세 페이지 상단 메타정보
- [ ] `src/app/layout.tsx`에 Header·Footer·ThemeProvider 통합
- [ ] HTML `suppressHydrationWarning` 속성 추가 (다크모드 SSR 깜빡임 방지)

### TASK-007: ⬜ Notion 블록 렌더러 컴포넌트

- [ ] `src/components/notion/block-renderer.tsx` — 블록 타입별 분기 렌더링
- [ ] `src/components/notion/rich-text.tsx` — bold·italic·code·link 어노테이션 처리
- [ ] `src/components/notion/code-block.tsx` — `react-syntax-highlighter` 통합 (라이트/다크 테마 분기)
- [ ] `src/components/notion/image-block.tsx` — Next.js Image 사용, alt 텍스트 처리
- [ ] `src/components/notion/list-block.tsx` — bulleted/numbered 리스트 렌더링
- [ ] `src/components/notion/quote-block.tsx` — quote 블록 렌더링
- [ ] 컴포넌트 단위 import 정리 및 타입 안정성 검증

---

## Phase 3: 핵심 기능 개발

> **목적**: 블로그의 가장 기본이 되는 글 목록·상세·Notion 컨텐츠 렌더링을 완성합니다.
> **이 순서인 이유**: 블로그 본질인 "글 읽기" 경험이 동작해야 이후 부가 기능(검색·필터·SEO)이 의미를 가집니다. 핵심 기능을 먼저 검증해야 부가 기능 설계도 정확해집니다.
> **예상 소요 시간**: 3~4일
> **완료 기준**: 홈에서 글 목록을 보고 상세 페이지로 이동하여 Notion 컨텐츠가 정상 렌더링되는 전체 플로우가 Playwright E2E 테스트를 통과합니다.

### TASK-008: ⬜ 블로그 글 목록 페이지 (F001) — 우선순위

- [ ] `src/app/page.tsx`에 `fetchPages()` 호출 → `PostCard` 그리드 렌더링
- [ ] 카드 그리드 레이아웃 (모바일 1열, 태블릿 2열, 데스크탑 3열)
- [ ] 빈 상태 UI (글이 0건일 때)
- [ ] 발행일 내림차순 정렬 표시 검증
- [ ] 글 카드 클릭 시 `/posts/[slug]`로 이동
- [ ] 로딩 상태 처리 (`loading.tsx`)
- [ ] 에러 상태 처리 (`error.tsx`)

#### 테스트 체크리스트
- [ ] Playwright MCP로 홈 페이지 접속 → 실제 Notion 글 목록 노출 확인
- [ ] Status=draft 글이 노출되지 않는지 확인
- [ ] 발행일 내림차순 정렬 확인
- [ ] 글 카드 클릭 → 상세 페이지 이동 확인
- [ ] 모바일 뷰포트(375px)에서 1열 레이아웃 동작 확인

### TASK-009: ⬜ 블로그 글 상세 페이지 (F002)

- [ ] `src/app/posts/[slug]/page.tsx`에 `fetchPageContent()` 연동
- [ ] slug → Notion 페이지 ID 매핑 로직 구현
- [ ] `PostMeta` 컴포넌트로 상단 메타정보(제목·카테고리·태그·발행일) 표시
- [ ] `generateStaticParams()` 구현 (발행된 모든 글 slug 사전 생성)
- [ ] 존재하지 않는 slug 진입 시 `notFound()` 호출
- [ ] 본문 최대 너비 제한 (`max-w-prose`)

#### 테스트 체크리스트
- [ ] Playwright MCP로 임의 글 상세 페이지 접속 → 본문·메타정보 노출 확인
- [ ] 존재하지 않는 slug 접속 시 404 페이지 노출 확인
- [ ] `generateStaticParams`로 생성된 라우트 정상 응답 확인

### TASK-010: ⬜ Notion 컨텐츠 렌더링 통합

- [ ] 글 상세 페이지에 `BlockRenderer` 연결 → 모든 블록 타입 렌더링
- [ ] 코드 블록 신택스 하이라이팅 동작 (라이트/다크 테마 자동 전환)
- [ ] 이미지 블록 — Notion S3 도메인을 `next.config.ts`의 `images.remotePatterns`에 등록
- [ ] 인라인 어노테이션(bold/italic/code/link) 정상 표시
- [ ] 중첩 리스트 들여쓰기 처리

#### 테스트 체크리스트
- [ ] Playwright MCP로 다양한 블록(code, image, list, quote)이 포함된 글 접속 → 정상 렌더링 확인
- [ ] 다크모드 토글 시 코드 블록 테마 전환 확인
- [ ] 이미지 lazy loading 및 alt 텍스트 적용 확인

---

## Phase 4: 추가 기능 개발

> **목적**: 카테고리 필터링·검색·SEO 메타데이터로 콘텐츠 발견성과 검색 유입을 보강합니다.
> **이 순서인 이유**: 핵심 기능이 완성되어 글이 안정적으로 표시되는 상태에서 부가 기능을 추가해야 메타데이터·검색 인덱스가 실제 콘텐츠와 정확히 일치합니다.
> **예상 소요 시간**: 2~3일
> **완료 기준**: 카테고리 필터·검색이 정확히 동작하고, 모든 페이지의 OG 미리보기가 정상 표시됩니다.

### TASK-011: ⬜ 카테고리 필터링 (F003) — 우선순위

- [ ] `src/app/category/[name]/page.tsx`에 `fetchPages({ category })` 연동
- [ ] 카테고리명 디코딩 처리 (URL 인코딩 → 한글 카테고리 지원)
- [ ] 헤더 카테고리 메뉴를 `fetchCategories()` 기반 동적 렌더링
- [ ] 홈 페이지 상단에 카테고리 버튼 그룹 추가 (`src/components/post/category-filter.tsx`)
- [ ] 카테고리 페이지에 글 수 표시 및 빈 상태 UI
- [ ] 카테고리 페이지 `generateStaticParams()` 구현

#### 테스트 체크리스트
- [ ] Playwright MCP로 카테고리 버튼 클릭 → 정확한 글 목록 노출 확인
- [ ] 한글 카테고리명 URL 처리 검증
- [ ] 글이 없는 카테고리의 빈 상태 화면 확인
- [ ] 헤더 카테고리 메뉴에서 카테고리 페이지 진입 확인

### TASK-012: ⬜ 키워드 검색 기능 (F004)

- [ ] `src/components/post/search-input.tsx` — controlled input + 디바운스(200ms)
- [ ] 홈 페이지를 server-fetch + client-filter 구조로 변경 (전체 글 → 클라이언트에서 제목 기준 필터)
- [ ] 검색어 부분 일치 필터링 (대소문자 무시)
- [ ] 빈 검색 결과 UI
- [ ] 카테고리 필터와 검색 동시 동작 보장
- [ ] URL query string 동기화는 MVP 이후로 명시 (구현 제외)

#### 테스트 체크리스트
- [ ] Playwright MCP로 검색어 입력 → 실시간 필터링 확인
- [ ] 검색 결과 없음 UI 노출 확인
- [ ] 카테고리 필터와 검색이 함께 동작하는지 확인
- [ ] 디바운스 동작 확인 (빠른 타이핑 시 호출 빈도 검증)

### TASK-013: ⬜ SEO 메타데이터 (F010)

- [ ] `src/app/layout.tsx`의 `metadata` export — 사이트 기본 OG·title 템플릿 설정
- [ ] 홈 페이지 `generateMetadata()` — siteConfig 기반 메타정보
- [ ] 글 상세 페이지 `generateMetadata()` — 제목·요약(첫 paragraph) 기반 동적 생성
- [ ] 카테고리 페이지 `generateMetadata()` — 카테고리명 기반 title/description
- [ ] OG 이미지 — 글 첫 이미지 또는 기본 OG 이미지 fallback
- [ ] `robots.txt`, `sitemap.xml` (Next.js Metadata API)

#### 테스트 체크리스트
- [ ] Playwright MCP로 각 페이지 `<head>` 태그 검증 (title, description, og:*, twitter:*)
- [ ] 글 상세 페이지의 OG title이 글 제목과 일치하는지 확인
- [ ] sitemap.xml에 모든 발행 글이 포함되는지 확인
- [ ] 카카오톡/슬랙 미리보기 OG 이미지 확인 (수동 또는 메타 검증 도구)

---

## Phase 5: 최적화 및 배포

> **목적**: ISR 캐싱·반응형 디테일·성능 최적화를 적용하고 Vercel에 배포하여 실서비스 환경에서 동작을 검증합니다.
> **이 순서인 이유**: 모든 기능이 완성된 후 품질을 향상시켜야 캐싱 무효화 전략과 반응형 디테일이 실제 사용 패턴에 맞게 설계됩니다.
> **예상 소요 시간**: 1~2일
> **완료 기준**: Vercel에 배포되어 Notion 글 수정 후 revalidate 시간 내 자동 반영되며, Lighthouse 성능·접근성·SEO 점수가 모두 90+ 입니다.

### TASK-014: ⬜ ISR 캐싱 및 성능 최적화 (F011) — 우선순위

- [ ] 홈 페이지 `export const revalidate = 60` (1분 단위 갱신)
- [ ] 글 상세 페이지 `revalidate = 300` (5분 단위 갱신)
- [ ] 카테고리 페이지 `revalidate = 60`
- [ ] `generateStaticParams()` + `dynamicParams = true`로 신규 글 자동 생성
- [ ] (선택) On-Demand Revalidation API route — `/api/revalidate?secret=xxx`
- [ ] Next.js Image 컴포넌트 적용 (Notion 이미지 도메인 `next.config.ts` 등록)
- [ ] `next/font` 폰트 최적화
- [ ] `react-syntax-highlighter` lazy import (번들 크기 절감)
- [ ] Lighthouse 성능·접근성·SEO 점수 측정 및 90점 이상 달성

#### 테스트 체크리스트
- [ ] Playwright MCP로 첫 요청 → 캐시 응답 확인 (`x-vercel-cache` 헤더)
- [ ] revalidate 시간 후 Notion 글 수정 → 갱신 반영 확인
- [ ] 신규 글 발행 시 동적 라우트 자동 생성 확인
- [ ] Lighthouse 성능 점수 90+ 달성 검증

### TASK-015: ⬜ 반응형 디자인 개선 (F013)

- [ ] 모바일 패딩·타이포그래피 조정 (글 상세 본문 가독성)
- [ ] 헤더 모바일 네비게이션 (햄버거 메뉴 또는 가로 스크롤)
- [ ] 카드 그리드 브레이크포인트 미세 조정
- [ ] 키보드 포커스 링·ARIA 속성 점검
- [ ] 이미지 alt 텍스트 fallback 처리
- [ ] 다크모드 시 코드 블록·이미지 가독성 검증

#### 테스트 체크리스트
- [ ] Playwright MCP로 모바일(375px)·태블릿(768px)·데스크탑(1280px) 뷰포트별 전체 플로우 동작 확인
- [ ] 헤더 모바일 네비게이션 동작 검증
- [ ] 다크모드 토글 → 새로고침 후 상태 유지 확인

### TASK-016: ⬜ Vercel 배포 및 운영 문서화

- [ ] Vercel 프로젝트 생성 및 GitHub 저장소 연결
- [ ] Vercel 대시보드에 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 등록
- [ ] 커스텀 도메인 연결 (선택)
- [ ] 배포 후 모든 페이지 동작 검증
- [ ] (선택) Vercel Analytics 연동
- [ ] `README.md`에 로컬 개발·배포·환경 변수 가이드 작성
- [ ] Notion DB 스키마 가이드 (Status, Category, Tags 필드 설정법)
- [ ] 글 작성·발행 워크플로우 가이드
- [ ] 최종 인수 테스트 (PRD F001~F013 전 항목 충족 검증)

#### 테스트 체크리스트
- [ ] Playwright MCP로 배포된 프로덕션 URL 전체 플로우 검증
- [ ] 환경 변수가 정상 주입되어 Notion API 호출이 동작하는지 확인
- [ ] 프로덕션 환경에서 다크모드·검색·카테고리 필터 동작 확인

---

## MVP 이후 백로그 (참고)

PRD에서 명시적으로 제외된 항목으로, 향후 별도 로드맵에서 다룰 후보군입니다.

- 댓글 시스템 (Giscus, Disqus 등)
- 뉴스레터 구독 (Resend, Buttondown)
- 태그별 필터링 페이지
- RSS 피드 자동 생성
- 조회수 카운터 (Vercel KV, Upstash)
- 관련 글 추천 (벡터 임베딩)
- 검색 URL query string 동기화
- On-Demand Revalidation Webhook (Notion → Vercel)
