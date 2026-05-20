# Pannya LMS — Project Task Tracker

**Last updated:** 2026-05-16  
**Version:** 0.2.0  
**Stack:** Next.js 15.1.7 · React 19 · TypeScript · Tailwind CSS 3 · Node.js v24  
**Dev server:** `npm run dev` → http://localhost:3000

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Done — merged, running, verified |
| 🔄 | In progress — partially built |
| ⬜ | Pending — not started |
| 🚧 | Blocked — waiting on dependency |
| ❌ | Won't do — out of scope |

---

## Overall Progress

```
Phase 1 — Foundation       ████████████████████  100%  ✅
Phase 2 — Core Pages       ████████████████████  100%  ✅
Phase 3 — Remaining Pages  █████████████░░░░░░░   65%  🔄
Phase 4 — Backend & Auth   ██░░░░░░░░░░░░░░░░░░   10%  🔄
Phase 5 — Production       ░░░░░░░░░░░░░░░░░░░░    0%  ⬜
```

---

## Phase 1 — Foundation ✅ COMPLETE

> Project scaffold, design system, shared code — everything downstream pages depend on.

| # | Task | File | Status |
|---|------|------|--------|
| 1.1 | Next.js 15 project scaffold (TypeScript, Tailwind, App Router, `src/`) | `package.json`, `next.config.ts` | ✅ |
| 1.2 | Tailwind config with Pannya color tokens | `tailwind.config.ts` | ✅ |
| 1.3 | Global CSS — design tokens, `.ph` placeholders, `serif`/`mono` helpers | `src/app/globals.css` | ✅ |
| 1.4 | Root layout with IBM Plex fonts (Sans Thai, Serif, Mono) via `next/font` | `src/app/layout.tsx` | ✅ |
| 1.5 | TypeScript types — `Course`, `Lesson`, `Category`, `CareerPath` | `src/types/course.ts` | ✅ |
| 1.6 | TypeScript types — `User`, `Enrollment`, `CourseProgress` | `src/types/user.ts` | ✅ |
| 1.7 | TypeScript types — `Certificate` | `src/types/certificate.ts` | ✅ |
| 1.8 | TypeScript types — `Quiz`, `QuizQuestion`, `QuizAttempt`, `QuizResult` | `src/types/quiz.ts` | ✅ |
| 1.9 | Mock data — 8 courses (featured + trending) with full schema | `src/data/courses.ts` | ✅ |
| 1.10 | Mock data — 8 categories, 4 career paths, nav filters | `src/data/categories.ts` | ✅ |
| 1.11 | Mock data — 2 instructors with bio and stats | `src/data/instructors.ts` | ✅ |
| 1.12 | Mock data — 2 quizzes (10 + 3 questions) for Value Investing course | `src/data/quizzes.ts` | ✅ |
| 1.13 | `Icon` component — 30+ stroke icons, SVG path map | `src/components/ui/Icon.tsx` | ✅ |
| 1.14 | `Logo` component — Pannya SVG mark + wordmark with coral dot | `src/components/ui/Logo.tsx` | ✅ |
| 1.15 | `SectionHeader` — eyebrow / title / subtitle / action slot | `src/components/ui/SectionHeader.tsx` | ✅ |
| 1.16 | `TopNav` — brand, nav links, search bar, bell/cart/avatar | `src/components/features/nav/TopNav.tsx` | ✅ |
| 1.17 | `Footer` — 5-column dark footer with social icons | `src/components/features/nav/Footer.tsx` | ✅ |
| 1.18 | `CourseCard` — thumbnail, badge, rating, price, discount % | `src/components/features/course/CourseCard.tsx` | ✅ |
| 1.19 | `CourseCardHorizontal` — compact card for dashboard lists | `src/components/features/course/CourseCardHorizontal.tsx` | ✅ |
| 1.20 | `CourseProgressCard` — client component reading localStorage progress | `src/components/features/dashboard/CourseProgressCard.tsx` | ✅ |
| 1.21 | `useProgress` hook — localStorage read/write for lesson completion | `src/hooks/useProgress.ts` | ✅ |
| 1.22 | `utils.ts` — `cn()`, `formatPrice()`, `discountPercent()` | `src/lib/utils.ts` | ✅ |
| 1.23 | Middleware — route protection for `/dashboard`, `/learn`, `/certificate` | `src/middleware.ts` | ✅ |
| 1.24 | `.gitignore`, `.nvmrc`, `.env.local.example`, `SETUP.md` | root | ✅ |

---

## Phase 2 — Core Pages ✅ COMPLETE

> The 6 screens from the HTML prototype, auth flows, and all 5 LMS core modules.

### Module 1 — Student Login / Auth ✅

| # | Page | Route | Rendering | File | Status |
|---|------|-------|-----------|------|--------|
| 2.1 | Login | `/login` | Static | `src/app/(auth)/login/page.tsx` | ✅ |
| 2.2 | Register | `/register` | Static + Client | `src/app/(auth)/register/page.tsx` | ✅ |
| 2.3 | Forgot Password | `/forgot-password` | Static + Client | `src/app/(auth)/forgot-password/page.tsx` | ✅ |

### Module 2 — Browse Course ✅

| # | Page | Route | Rendering | File | Status |
|---|------|-------|-----------|------|--------|
| 2.4 | Homepage | `/` | SSG | `src/app/page.tsx` | ✅ |
| 2.5 | Course Catalog | `/courses` | ISR 1h | `src/app/(catalog)/courses/page.tsx` | ✅ |
| 2.6 | Course Detail | `/courses/[slug]` | ISR 1h | `src/app/(catalog)/courses/[slug]/page.tsx` | ✅ |
| 2.7 | Search Results | `/search` | SSR dynamic | `src/app/(catalog)/search/page.tsx` | ✅ |
| 2.8 | Instructor Profile | `/instructor/[slug]` | ISR 1h | `src/app/(catalog)/instructor/[slug]/page.tsx` | ✅ |

### Module 3 — Learn Lesson ✅

| # | Page | Route | Rendering | File | Status |
|---|------|-------|-----------|------|--------|
| 2.9 | Video Player | `/learn/[courseId]/[lessonId]` | Client | `src/app/(learner)/learn/[courseId]/[lessonId]/page.tsx` | ✅ |

**Player features:**
- ✅ Lesson navigation (sidebar + prev/next buttons)
- ✅ Mark Complete button → writes to localStorage
- ✅ Progress bar in header reads real localStorage completion count
- ✅ "Next Lesson" button after marking complete
- ✅ Quiz entry points in sidebar (gold book icon)
- ✅ Quiz link button when at final lesson of section

### Module 4 — Take Quiz ✅

| # | Page / Route | File | Status |
|---|------|------|--------|
| 2.10 | Quiz page | `src/app/(learner)/learn/[courseId]/quiz/[quizId]/page.tsx` | ✅ |
| 2.11 | GET `/api/quiz/[quizId]` | `src/app/api/quiz/[quizId]/route.ts` | ✅ |
| 2.12 | POST `/api/quiz/[quizId]/submit` | `src/app/api/quiz/[quizId]/submit/route.ts` | ✅ |

**Quiz features:**
- ✅ Intro screen (title, description, question count, time limit, passing score)
- ✅ Interactive question view — single / multiple / true-false
- ✅ Question navigator (number grid with answered/current state)
- ✅ Countdown timer (turns red at <60s)
- ✅ Submit on last question or early submit when all answered
- ✅ Result screen — score %, pass/fail, detailed breakdown with explanations
- ✅ Retry button if failed; correct answers highlighted in green
- ✅ Server API grades on submit; correctIds hidden from GET response
- ✅ 10-question quiz on Value Investing Fundamentals (q-vi-001)
- ✅ 3-question quiz on Financial Statement Analysis (q-vi-002)

### Module 5 — Track Progress ✅

| # | Route | File | Status |
|---|------|------|--------|
| 2.13 | Learner Dashboard | `src/app/(learner)/dashboard/page.tsx` | ✅ |
| 2.14 | GET/POST `/api/progress` | `src/app/api/progress/route.ts` | ✅ |
| 2.15 | `useProgress` hook | `src/hooks/useProgress.ts` | ✅ |

**Progress features:**
- ✅ Dashboard reads real localStorage progress (via `CourseProgressCard` client component)
- ✅ Progress % hydrates from localStorage on mount; no flash/mismatch
- ✅ `/api/progress` GET returns completed lessons (cookie-backed stub)
- ✅ `/api/progress` POST marks lesson complete / resets course

### Other Screens ✅

| # | Page | Route | File | Status |
|---|------|-------|------|--------|
| 2.16 | Certificate | `/certificate/[id]` | `src/app/(learner)/certificate/[id]/page.tsx` | ✅ |
| 2.17 | 404 Not Found | `*` | `src/app/not-found.tsx` | ✅ |

---

## Phase 3 — Additional Pages 🔄 PARTIAL

> From CLAUDE.md Phase 2 design expansion list — lower priority than core modules.

| # | Page | Route | Priority | Status |
|---|------|-------|----------|--------|
| 3.1 | Cart | `/cart` | High | ⬜ |
| 3.2 | Checkout | `/checkout` | High | ⬜ |
| 3.3 | Settings | `/settings` | Medium | ⬜ |
| 3.4 | Notifications | `/notifications` | Medium | ⬜ |
| 3.5 | Live Session Schedule | `/live` | Medium | ⬜ |
| 3.6 | About | `/about` | Low | ⬜ |
| 3.7 | Pricing | `/pricing` | Low | ⬜ |
| 3.8 | Pannya for Business | `/business` | Low | ⬜ |

### Phase 3 Components Needed

| # | Component | Used by | Status |
|---|-----------|---------|--------|
| 3.9 | `CartDrawer` (client, Zustand) | All pages | ⬜ |
| 3.10 | `MobileMenu` (client) | TopNav | ⬜ |
| 3.11 | `ProgressRing` (client, SVG) | Dashboard | ⬜ |
| 3.12 | `FilterSidebar` (client) | Search, Catalog | ⬜ |
| 3.13 | `CheckoutForm` (Zod + RHF) | Checkout | ⬜ |

### Phase 3 Stubs (wired but not fully functional)

| # | Feature | Issue | Status |
|---|---------|-------|--------|
| 3.14 | Bookmark button (CourseCard) | State not persisted (no store) | 🔄 |
| 3.15 | Cart icon (TopNav) | Route not built | 🔄 |
| 3.16 | TopNav search | Navigates to `/search` ✅ but filters not URL-synced with nuqs | 🔄 |

---

## Phase 4 — Backend & Auth 🔄 10% STARTED

> Replace mock data and cookie/localStorage stubs with real persistence.

### 4A — Authentication

| # | Task | Dependencies | Status |
|---|------|-------------|--------|
| 4.1 | Install Auth.js v5 (`next-auth@beta`) | — | ⬜ |
| 4.2 | `src/lib/auth.ts` — Google + Email providers | 4.1 | ⬜ |
| 4.3 | `src/app/api/auth/[...nextauth]/route.ts` handler | 4.2 | ⬜ |
| 4.4 | Replace middleware cookie stub with real `auth()` session check | 4.2 | ⬜ |
| 4.5 | Update TopNav to show real user name / avatar | 4.4 | ⬜ |
| 4.6 | `useSession()` hook in Client Components that need user data | 4.4 | ⬜ |

### 4B — Database

| # | Task | Dependencies | Status |
|---|------|-------------|--------|
| 4.7 | Install Prisma + set `DATABASE_URL` in `.env.local` | — | ⬜ |
| 4.8 | `prisma/schema.prisma` — User, Course, Lesson, Enrollment, Progress, Certificate, Quiz, QuizAttempt | 4.7 | ⬜ |
| 4.9 | `src/lib/db.ts` — Prisma singleton | 4.8 | ⬜ |
| 4.10 | `npx prisma migrate dev` initial migration | 4.8 | ⬜ |
| 4.11 | Seed script with mock data | 4.10 | ⬜ |

### 4C — API Routes (stubs → real)

| # | Task | Route | Dependencies | Status |
|---|------|-------|-------------|--------|
| 4.12 | `GET /api/courses` — list with filters | `src/app/api/courses/route.ts` | 4.9 | ⬜ |
| 4.13 | `GET /api/courses/[slug]` — single course | `src/app/api/courses/[slug]/route.ts` | 4.9 | ⬜ |
| 4.14 | `POST /api/enrollment` — enroll in course | `src/app/api/enrollment/route.ts` | 4.4, 4.9 | ⬜ |
| 4.15 | Upgrade `GET/POST /api/progress` → Prisma (currently cookie stub) | `src/app/api/progress/route.ts` | 4.4, 4.9 | 🔄 stub done |
| 4.16 | Upgrade `GET /api/quiz/[quizId]` → Prisma | `src/app/api/quiz/[quizId]/route.ts` | 4.9 | 🔄 mock done |
| 4.17 | Upgrade `POST /api/quiz/[quizId]/submit` → persist QuizAttempt | `src/app/api/quiz/[quizId]/submit/route.ts` | 4.4, 4.9 | 🔄 mock done |
| 4.18 | `GET/POST/DELETE /api/cart` — cart items | `src/app/api/cart/route.ts` | 4.4 | ⬜ |
| 4.19 | `POST /api/revalidate` — on-demand ISR webhook | `src/app/api/revalidate/route.ts` | — | ⬜ |
| 4.20 | Server Action: `createEnrollment()` | — | 4.9, 4.4 | ⬜ |
| 4.21 | Server Action: `updateProgress()` | — | 4.9, 4.4 | ⬜ |

### 4D — State Management

| # | Task | Package | Status |
|---|------|---------|--------|
| 4.22 | Install Zustand — cart + wishlist global state | `zustand` | ⬜ |
| 4.23 | `src/lib/stores/cart-store.ts` with `persist` middleware | 4.22 | ⬜ |
| 4.24 | Install nuqs — URL search params for Search / Catalog filters | `nuqs` | ⬜ |
| 4.25 | Install TanStack Query — client-side server state in Player | `@tanstack/react-query` | ⬜ |

---

## Phase 5 — Production Readiness ⬜ NOT STARTED

### 5A — Real Content

| # | Task | Status |
|---|------|--------|
| 5.1 | Replace all `.ph` placeholder divs with `<Image>` (next/image) | ⬜ |
| 5.2 | Upload course thumbnail images to Cloudflare R2 / S3 | ⬜ |
| 5.3 | Upload instructor portrait photos | ⬜ |
| 5.4 | Embed real video player (Mux / Vimeo) in Player page | ⬜ |
| 5.5 | Write real Thai copy for all static pages | ⬜ |

### 5B — Performance & SEO

| # | Task | Status |
|---|------|--------|
| 5.6 | Verify Core Web Vitals with Lighthouse (LCP < 2.5s, CLS < 0.1) | ⬜ |
| 5.7 | Add `<link rel="preload">` for above-the-fold fonts/images | ⬜ |
| 5.8 | Disable Next.js telemetry — `NEXT_TELEMETRY_DISABLED=1` | ⬜ |

### 5C — Animation & Polish

| # | Task | Package | Status |
|---|------|---------|--------|
| 5.9 | Install Framer Motion | `framer-motion` | ⬜ |
| 5.10 | Page transition animations | 5.9 | ⬜ |
| 5.11 | CourseCard hover lift animation | 5.9 | ⬜ |
| 5.12 | Progress bar animated fill | 5.9 | ⬜ |

### 5D — Internationalisation

| # | Task | Status |
|---|------|--------|
| 5.13 | Add `next-intl` or Next.js i18n routing | ⬜ |
| 5.14 | Extract all Thai strings to `messages/th.json` | ⬜ |
| 5.15 | Create `messages/en.json` English translations | ⬜ |
| 5.16 | Add language switcher to TopNav | ⬜ |

### 5E — Testing

| # | Task | Package | Status |
|---|------|---------|--------|
| 5.17 | Install Vitest + React Testing Library | `vitest` | ⬜ |
| 5.18 | Unit tests: `formatPrice()`, `discountPercent()`, quiz grading logic | 5.17 | ⬜ |
| 5.19 | Component tests: `CourseCard`, `TopNav`, `QuizWidget` render | 5.17 | ⬜ |
| 5.20 | Install Playwright | `playwright` | ⬜ |
| 5.21 | E2E: Guest visits homepage → catalog → detail → login flow | 5.20 | ⬜ |
| 5.22 | E2E: Enrolled user → player → mark complete → certificate | 5.20 | ⬜ |
| 5.23 | E2E: Student takes quiz → fails → retries → passes | 5.20 | ⬜ |

### 5F — Deployment

| # | Task | Status |
|---|------|--------|
| 5.24 | Connect GitHub repo | ⬜ |
| 5.25 | Create Vercel project, link to repo | ⬜ |
| 5.26 | Provision Neon PostgreSQL (or Supabase) | ⬜ |
| 5.27 | Provision Upstash Redis (session / cache) | ⬜ |
| 5.28 | Set all `NEXT_PUBLIC_*` and secret env vars in Vercel dashboard | ⬜ |
| 5.29 | Configure Cloudflare DNS for custom domain | ⬜ |
| 5.30 | Smoke-test production URL | ⬜ |

---

## Known Issues & Tech Debt

| # | Issue | File | Severity | Resolution |
|---|-------|------|----------|------------|
| TD-1 | Auth middleware uses hardcoded cookie `pannya-auth-token` — not real auth | `src/middleware.ts` | High | Replace with Auth.js `auth()` in Phase 4 |
| TD-2 | Bookmark button state not persisted (no store) | `CourseCard.tsx` | Medium | Add Zustand wishlist store in Phase 4 |
| TD-3 | Player lesson completion stored in localStorage — lost on clear | `player/page.tsx` | Medium | Sync to `POST /api/progress` in Phase 4 |
| TD-4 | All `.ph` divs are colored `<div>` — no real images | All pages | Medium | Replace with `<Image>` in Phase 5 |
| TD-5 | Cart icon in TopNav leads to unbuilt `/cart` route | `TopNav.tsx` | Medium | Build cart page in Phase 3 |
| TD-6 | Quiz attempt not persisted (best-effort API fire, no DB) | `quiz/page.tsx` | Medium | Persist QuizAttempt via Prisma in Phase 4 |
| TD-7 | Search filter chips not URL-synced (nuqs not installed) | `search/page.tsx` | Low | Install nuqs in Phase 4 |
| TD-8 | `select` filter in Catalog has no active state / URL sync | `courses/page.tsx` | Low | nuqs in Phase 4 |
| TD-9 | Node.js not in system PATH — must use full path to run | machine | Low | Add `C:\Program Files\nodejs` to system PATH |
| TD-10 | 2 npm audit vulnerabilities (1 moderate, 1 critical) | `package-lock.json` | Low | Run `npm audit fix` when ready |

---

## Quick Reference — Run Commands

```powershell
# Start development server (Node.js not in PATH yet)
cd "d:\MAI\Agentic AI_Training\pannya-lms"
& "C:\Program Files\nodejs\npm.cmd" run dev
# → http://localhost:3000

# If Node is in PATH (after fixing TD-9):
npm run dev       # development
npm run build     # production build
npm run start     # serve production build
npm run lint      # ESLint check
```

---

## File Map (Current — 50 files)

```
pannya-lms/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── forgot-password/page.tsx        ✅ client
│   │   │   ├── login/page.tsx                  ✅
│   │   │   └── register/page.tsx               ✅ client
│   │   ├── (catalog)/
│   │   │   ├── courses/page.tsx                ✅ ISR
│   │   │   ├── courses/[slug]/page.tsx         ✅ ISR
│   │   │   ├── instructor/[slug]/page.tsx      ✅ ISR
│   │   │   └── search/page.tsx                 ✅ SSR
│   │   ├── (learner)/
│   │   │   ├── certificate/[id]/page.tsx       ✅ SSR
│   │   │   ├── dashboard/page.tsx              ✅ SSR
│   │   │   └── learn/[courseId]/
│   │   │       ├── [lessonId]/page.tsx         ✅ client — Mark Complete, Next Lesson, localStorage
│   │   │       └── quiz/[quizId]/page.tsx      ✅ client — full interactive quiz
│   │   ├── api/
│   │   │   ├── progress/route.ts               ✅ GET+POST (cookie stub)
│   │   │   └── quiz/
│   │   │       └── [quizId]/
│   │   │           ├── route.ts                ✅ GET (strips correctIds)
│   │   │           └── submit/route.ts         ✅ POST (grades + returns result)
│   │   ├── globals.css                         ✅
│   │   ├── layout.tsx                          ✅
│   │   ├── not-found.tsx                       ✅
│   │   └── page.tsx                            ✅ SSG homepage
│   ├── components/
│   │   ├── features/
│   │   │   ├── course/
│   │   │   │   ├── CourseCard.tsx              ✅ client
│   │   │   │   └── CourseCardHorizontal.tsx    ✅
│   │   │   ├── dashboard/
│   │   │   │   └── CourseProgressCard.tsx      ✅ client — reads localStorage
│   │   │   └── nav/
│   │   │       ├── Footer.tsx                  ✅
│   │   │       └── TopNav.tsx                  ✅
│   │   └── ui/
│   │       ├── Icon.tsx                        ✅
│   │       ├── Logo.tsx                        ✅
│   │       └── SectionHeader.tsx               ✅
│   ├── data/
│   │   ├── categories.ts                       ✅
│   │   ├── courses.ts                          ✅
│   │   ├── index.ts                            ✅
│   │   ├── instructors.ts                      ✅
│   │   └── quizzes.ts                          ✅ 13 questions across 2 quizzes
│   ├── hooks/
│   │   └── useProgress.ts                      ✅ localStorage hook
│   ├── lib/utils.ts                            ✅
│   ├── middleware.ts                           ✅ stub auth
│   └── types/
│       ├── certificate.ts                      ✅
│       ├── course.ts                           ✅
│       ├── index.ts                            ✅
│       ├── quiz.ts                             ✅
│       └── user.ts                             ✅
├── .env.local.example                         ✅
├── .gitignore                                  ✅
├── .nvmrc                                      ✅
├── next.config.ts                              ✅
├── package.json                                ✅
├── postcss.config.mjs                          ✅
├── SETUP.md                                    ✅
├── TASK.md                                     ✅ ← this file
├── tailwind.config.ts                          ✅
└── tsconfig.json                               ✅
```

---

## Core Module Status (PRD Section 10)

| Module | Description | Status |
|--------|-------------|--------|
| Module 1 | Student Login — login, register, forgot-password, middleware | ✅ Complete |
| Module 2 | Browse Course — homepage, catalog, detail, search, instructor | ✅ Complete |
| Module 3 | Learn Lesson — player, mark complete, next lesson, localStorage | ✅ Complete |
| Module 4 | Take Quiz — interactive quiz, timer, grading, explanations | ✅ Complete |
| Module 5 | Track Progress — dashboard, progress API, useProgress hook | ✅ Complete |

---

*Update this file after completing each task. Change `⬜` → `🔄` when starting, `🔄` → `✅` when done.*
