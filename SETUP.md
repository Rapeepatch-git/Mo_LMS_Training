# Pannya LMS — Setup Guide

## ขั้นตอนติดตั้งและรัน

### 1. ติดตั้ง Node.js

Node.js ยังไม่ได้ติดตั้งบนเครื่องนี้ — ดาวน์โหลดจาก:

**https://nodejs.org/en/download** (เลือก LTS version 22.x)

หรือใช้ winget:
```powershell
winget install OpenJS.NodeJS.LTS
```

หลังติดตั้งให้รีสตาร์ท terminal แล้วตรวจสอบ:
```powershell
node --version   # ควรเป็น v22.x.x
npm --version    # ควรเป็น 10.x.x
```

---

### 2. ติดตั้ง dependencies

```powershell
cd "d:\MAI\Agentic AI_Training\pannya-lms"
npm install
```

---

### 3. ตั้งค่า environment

```powershell
Copy-Item .env.local.example .env.local
```

---

### 4. รัน dev server

```powershell
npm run dev
```

เปิด browser ไปที่ **http://localhost:3000**

---

## Scripts

| Command | Action |
|---|---|
| `npm run dev` | รัน development server (http://localhost:3000) |
| `npm run build` | Build production bundle |
| `npm run start` | รัน production server (ต้อง build ก่อน) |
| `npm run lint` | ตรวจสอบ ESLint |

---

## Pages ที่มีอยู่

| URL | หน้า | Rendering |
|---|---|---|
| `/` | Homepage | SSG |
| `/courses` | Course Catalog | ISR (1h) |
| `/courses/[slug]` | Course Detail | ISR (1h) |
| `/dashboard` | Learner Dashboard | SSR (ต้อง login) |
| `/learn/[courseId]/[lessonId]` | Video Player | Client (ต้อง login) |
| `/certificate/[id]` | Certificate | SSR (ต้อง login) |
| `/login` | Login | Static |
| `/404` | Not Found | Static |

---

## หมายเหตุสำหรับ dev

- Protected routes (`/dashboard`, `/learn`, `/certificate`) redirect ไป `/login` เมื่อไม่มี cookie `pannya-auth-token`
- เพื่อข้าม middleware ตอน dev: ตั้งค่า cookie ด้วย DevTools → Application → Cookies → `pannya-auth-token` = `dev-token`
- Mock data อยู่ใน `src/data/` — แก้ได้โดยตรงโดยไม่ต้องรีสตาร์ท server
