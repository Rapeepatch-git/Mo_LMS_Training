import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import TopNav from '@/components/features/nav/TopNav';
import Icon from '@/components/ui/Icon';
import { ALL_COURSES } from '@/data/courses';
import { INSTRUCTORS } from '@/data/instructors';
import { QUIZZES } from '@/data/quizzes';

export const metadata: Metadata = { title: 'Admin Panel — Pannya' };

const STATS = [
  { label: 'คอร์สทั้งหมด',    value: ALL_COURSES.length,   icon: 'book',   color: '#d4623f' },
  { label: 'ผู้สอน',          value: INSTRUCTORS.length,   icon: 'users',  color: '#6b3d52' },
  { label: 'แบบทดสอบ',        value: QUIZZES.length,       icon: 'award',  color: '#c9a14a' },
  { label: 'ผู้ใช้งาน (mock)', value: 2,                   icon: 'users',  color: '#6a8f6a' },
];

export default async function AdminPage() {
  const store = await cookies();
  const role = store.get('pannya-user-role')?.value;
  if (role !== 'admin') redirect('/login');

  return (
    <div className="min-h-screen bg-paper">
      <TopNav />

      <div className="px-12 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="font-mono text-[11px] text-plum uppercase tracking-widest mb-2">Admin Panel</div>
          <h1 className="serif text-3xl font-medium text-ink tracking-tight">ระบบจัดการ Pannya LMS</h1>
          <p className="text-ink-3 text-sm mt-1">ภาพรวมและจัดการข้อมูลของแพลตฟอร์ม</p>
        </div>

        {/* Stats row */}
        {/* Quick nav */}
        <div className="flex gap-3 mb-8">
          {[
            { label: 'จัดการคอร์ส', href: '/admin/courses', icon: 'book' },
            { label: 'สร้างคอร์สใหม่', href: '/admin/courses/new', icon: 'plus' },
          ].map((l) => (
            <Link key={l.href} href={l.href}
              className="inline-flex items-center gap-2 h-10 px-5 border border-line rounded-control text-sm font-medium text-ink hover:bg-cream transition-colors"
            >
              <Icon name={l.icon} size={15} color="#5a6275" /> {l.label}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-5 mb-10">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white border border-line rounded-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-ink-4">{s.label}</span>
                <div className="w-8 h-8 rounded-[8px] flex items-center justify-center" style={{ background: `${s.color}15` }}>
                  <Icon name={s.icon} size={16} color={s.color} />
                </div>
              </div>
              <div className="serif text-3xl font-medium text-ink">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-8" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {/* Courses table */}
          <section>
            <h2 className="serif text-xl font-medium text-ink mb-4">คอร์สทั้งหมด</h2>
            <div className="bg-white border border-line rounded-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line bg-cream-2">
                    <th className="text-left px-4 py-3 text-xs text-ink-4 font-medium">คอร์ส</th>
                    <th className="text-left px-4 py-3 text-xs text-ink-4 font-medium">ระดับ</th>
                    <th className="text-right px-4 py-3 text-xs text-ink-4 font-medium">ราคา</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {ALL_COURSES.map((c) => (
                    <tr key={c.id} className="hover:bg-cream/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-ink line-clamp-1">{c.title}</div>
                        <div className="text-xs text-ink-4">{c.instructor}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-ink-3">{c.level}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-ink text-xs">
                        ฿{c.price.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Right column */}
          <div className="space-y-8">
            {/* Users */}
            <section>
              <h2 className="serif text-xl font-medium text-ink mb-4">ผู้ใช้งาน (Mock)</h2>
              <div className="bg-white border border-line rounded-card divide-y divide-line">
                {[
                  { name: 'ABCD',  email: 'ABCD@gmail.com',  role: 'user',  initials: 'AB', color: 'bg-coral' },
                  { name: 'Admin', email: 'admin@gmail.com', role: 'admin', initials: 'AD', color: 'bg-plum'  },
                ].map((u) => (
                  <div key={u.email} className="flex items-center gap-3 px-4 py-3">
                    <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-semibold shrink-0 ${u.color}`}>
                      {u.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-ink">{u.name}</div>
                      <div className="text-xs text-ink-4">{u.email}</div>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      u.role === 'admin'
                        ? 'bg-plum/10 text-plum border-plum/20'
                        : 'bg-cream text-ink-4 border-line'
                    }`}>
                      {u.role.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Quizzes */}
            <section>
              <h2 className="serif text-xl font-medium text-ink mb-4">แบบทดสอบ</h2>
              <div className="bg-white border border-line rounded-card divide-y divide-line">
                {QUIZZES.map((q) => (
                  <div key={q.id} className="px-4 py-3">
                    <div className="text-sm font-medium text-ink line-clamp-1">{q.title}</div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-ink-4">
                      <span>{q.questions.length} ข้อ</span>
                      <span>·</span>
                      <span>ผ่าน {q.passingScore}%</span>
                      {q.timeLimit && <><span>·</span><span>{q.timeLimit / 60} นาที</span></>}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick links */}
            <section>
              <h2 className="serif text-xl font-medium text-ink mb-4">ลิงก์ด่วน</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'ดูหน้าแรก',    href: '/',          icon: 'book'   },
                  { label: 'Catalog',       href: '/courses',   icon: 'book'   },
                  { label: 'Quiz ตัวอย่าง', href: '/learn/c-001/quiz/q-vi-001', icon: 'award' },
                  { label: 'Dashboard',    href: '/dashboard', icon: 'users'  },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="flex items-center gap-2 h-10 px-3 border border-line rounded-control text-sm text-ink-3 hover:bg-cream hover:text-ink transition-colors"
                  >
                    <Icon name={l.icon} size={14} color="currentColor" />
                    {l.label}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
