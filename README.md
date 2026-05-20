# Pannya LMS (ปัญญา)

แพลตฟอร์มเรียนรู้ทักษะออนไลน์สำหรับผู้ใช้ภาษาไทย สร้างด้วย Next.js 15 App Router

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| UI Library | React 19 |
| Auth | Cookie-based stub (mock) |
| Data | In-memory / localStorage |
| Runtime | Node.js 20+ |

---

## Features

### นักเรียน (User)
- **หน้าหลัก** — hero, featured courses, categories
- **Catalog** — ค้นหา, กรองตามหมวดหมู่, เรียงลำดับ
- **Course Detail** — รายละเอียดคอร์ส, ตัวอย่างบทเรียน, ราคา
- **Instructor Profile** — ประวัติผู้สอน + คอร์สที่สอน
- **Video Player** — เล่นบทเรียน, ติ๊กเรียนจบ, progress bar
- **Quiz** — แบบทดสอบ (single/multiple/true-false), จับเวลา, ดูผลคะแนน
- **Dashboard** — คอร์สที่กำลังเรียน, progress จาก localStorage
- **Certificate** — ใบเสร็จรับรองเมื่อเรียนจบ
- **Cart + Checkout** — ตะกร้าสินค้า, ชำระเงิน (บัตรเครดิต / PromptPay / TrueMoney)

### Admin
- **Admin Panel** — ภาพรวมสถิติ, รายการคอร์ส, ผู้ใช้, quiz
- **Course Management** — สร้าง / แก้ไข / ลบคอร์ส

---

## Routes

```
/                          หน้าหลัก
/courses                   Catalog
/courses/[slug]            Course Detail
/instructor/[slug]         Instructor Profile
/search                    Search Results
/login                     เข้าสู่ระบบ
/register                  สมัครสมาชิก
/dashboard                 แดชบอร์ดนักเรียน (ต้อง login)
/learn/[courseId]/[lessonId]  Video Player (ต้อง login)
/learn/[courseId]/quiz/[quizId]  Quiz (ต้อง login)
/certificate/[id]          ใบรับรอง (ต้อง login)
/cart                      ตะกร้าสินค้า (ต้อง login)
/checkout                  ชำระเงิน (ต้อง login)
/checkout/success          สำเร็จ
/admin                     Admin Dashboard (ต้อง admin)
/admin/courses             จัดการคอร์ส (ต้อง admin)
/admin/courses/new         สร้างคอร์สใหม่ (ต้อง admin)
/admin/courses/[id]        แก้ไขคอร์ส (ต้อง admin)
```

---

## Getting Started

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. ตั้งค่า Environment (optional)

```bash
cp .env.local.example .env.local
```

### 3. รัน Dev Server

**Windows (PowerShell):**
```powershell
.\dev.ps1
```

**หรือรันตรง:**
```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์

---

## Test Accounts

| Role | Email | Password |
|---|---|---|
| User | `ABCD@gmail.com` | `1234` |
| Admin | `admin@gmail.com` | `admin1234` |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/            login, register, forgot-password
│   ├── (catalog)/         courses, search, instructor
│   ├── (learner)/         dashboard, learn, quiz, certificate
│   ├── (shop)/            cart, checkout
│   ├── admin/             admin panel + course management
│   └── api/               REST API routes
├── components/
│   ├── features/          admin, course, dashboard, nav, shop
│   └── ui/                Icon, Logo, SectionHeader
├── data/                  mock data (courses, quizzes, instructors)
├── hooks/                 useCart, useProgress
├── lib/                   utils, course-store
├── middleware.ts           route protection
└── types/                 TypeScript types
```

---

## Design System

- **Colors:** ink, coral, sage, gold, plum, paper, cream
- **Fonts:** IBM Plex Sans Thai, IBM Plex Serif, IBM Plex Mono
- **Brand tone:** สงบ · จริงจัง · เป็นมิตร

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint check |

---

## Roadmap

- [ ] Auth.js integration (real authentication)
- [ ] Prisma + PostgreSQL (real database)
- [ ] Real payment gateway (Omise / Stripe)
- [ ] Image uploads
- [ ] Dark mode
- [ ] i18n (ไทย + English)
- [ ] Framer Motion animations
- [ ] Mobile responsive

---

## License

MIT
