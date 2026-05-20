import type { Metadata } from 'next';
import Link from 'next/link';
import TopNav from '@/components/features/nav/TopNav';
import Footer from '@/components/features/nav/Footer';
import CourseCard from '@/components/features/course/CourseCard';
import SectionHeader from '@/components/ui/SectionHeader';
import Icon from '@/components/ui/Icon';
import { FEATURED_COURSES, TRENDING_COURSES } from '@/data/courses';
import { CATEGORIES, CAREER_PATHS } from '@/data/categories';

export const metadata: Metadata = {
  title: 'Pannya — เรียนรู้ทักษะใหม่จากผู้เชี่ยวชาญตัวจริง',
};

const STATS = [
  { n: '1,284', l: 'คอร์ส' },
  { n: '420+',  l: 'อาจารย์' },
  { n: '280K',  l: 'ผู้เรียน' },
  { n: '4.8★',  l: 'คะแนนเฉลี่ย' },
];

const AVATAR_COLORS = ['#d4623f', '#6a8f6a', '#c9a14a', '#6b3d52', '#1a1f2e'];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper">
      <TopNav active="home" />

      {/* Announcement bar */}
      <div className="bg-ink text-paper flex items-center justify-center gap-3.5 px-12 py-2.5 text-sm">
        <Icon name="sparkle" size={14} color="#c9a14a" />
        <span>
          ส่วนลด <strong className="text-gold">฿300</strong> สำหรับการซื้อคอร์สแรก — ใช้โค้ด{' '}
          <span className="font-mono bg-white/10 px-2 py-0.5 rounded">WELCOME300</span>
        </span>
        <span className="opacity-50">·</span>
        <button className="underline hover:no-underline">คลิกใช้โค้ด</button>
      </div>

      {/* ── Hero ── */}
      <section className="px-12 py-[72px] grid gap-16 items-center" style={{ gridTemplateColumns: '1.1fr .9fr' }}>
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-soft border border-[#e5d09a] rounded-full text-xs mb-6">
            <Icon name="flame" size={13} color="#a8852f" />
            <span className="text-[#7a5a1f] font-medium">นักเรียนกว่า 280,000 คนเลือกเรียนกับเรา</span>
          </div>

          <h1 className="serif m-0 text-[64px] leading-[1.04] font-medium tracking-[-0.025em]">
            เรียนรู้ทักษะใหม่<br />
            จาก<span className="italic text-coral">ผู้เชี่ยวชาญ</span>ตัวจริง
          </h1>

          <p className="mt-6 mb-9 text-[17px] leading-relaxed text-ink-3 max-w-[520px]">
            กว่า 1,200 คอร์สออนไลน์ ครอบคลุมตั้งแต่ธุรกิจ การลงทุน เทคโนโลยี ไปจนถึงภาษาและสุขภาพ —
            เรียนเมื่อสะดวก ทบทวนได้ตลอดชีพ
          </p>

          <div className="flex items-center gap-3 mb-12">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2.5 h-12 px-5 bg-coral text-white rounded-[10px] font-medium hover:bg-coral-dark transition-colors"
            >
              เริ่มเรียนเลย <Icon name="arrow-right" size={16} color="#fff" />
            </Link>
            <button className="inline-flex items-center gap-2.5 h-12 px-5 border border-line rounded-[10px] font-medium hover:bg-cream transition-colors">
              <Icon name="play" size={16} /> ดูตัวอย่างคอร์ส
            </button>
          </div>

          <div className="flex items-center gap-8 pt-8 border-t border-line">
            {STATS.map((s) => (
              <div key={s.l}>
                <div className="serif text-[28px] font-medium tracking-tight">{s.n}</div>
                <div className="text-xs text-ink-4 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero collage */}
        <div className="relative h-[520px]">
          <div className="ph coral absolute top-0 right-0 w-[380px] h-[340px] rounded-hero text-sm">
            hero instructor photo
          </div>
          <div className="ph navy absolute bottom-0 left-0 w-[280px] h-[200px] rounded-card text-xs">
            dashboard preview
          </div>

          {/* Live card */}
          <div className="absolute bottom-10 right-8 bg-paper border border-line rounded-card p-[14px_18px] shadow-lg w-60">
            <div className="font-mono text-[10px] text-coral mb-2 tracking-widest">LIVE NOW</div>
            <div className="text-[13px] font-semibold mb-1.5">การลงทุนหุ้น Q4 2025</div>
            <div className="text-[11px] text-ink-3 mb-2.5">กับ ดร.นิเวศน์ · 1,247 คนกำลังเรียน</div>
            <div className="flex items-center">
              {AVATAR_COLORS.map((c, i) => (
                <div
                  key={i}
                  className="w-[22px] h-[22px] rounded-full border-2 border-paper"
                  style={{ background: c, marginLeft: i ? '-8px' : 0 }}
                />
              ))}
              <span className="text-[11px] text-ink-3 ml-1.5">+1,242 คน</span>
            </div>
          </div>

          {/* Cert card */}
          <div className="absolute top-10 left-8 bg-ink text-paper rounded-card p-[14px_18px] w-44">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="cert" size={16} color="#c9a14a" />
              <span className="text-[11px] tracking-widest uppercase text-gold">Certificate</span>
            </div>
            <div className="text-[13px] leading-snug">รับใบประกาศนียบัตรทุกคอร์สที่จบ</div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="px-12 pb-[72px]">
        <SectionHeader
          eyebrow="เลือกตามความสนใจ"
          title="หมวดหมู่หลักสูตร"
          action={
            <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm hover:text-coral transition-colors">
              ดูทั้งหมด <Icon name="arrow-right" size={15} />
            </Link>
          }
        />
        <div className="grid grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/courses?category=${cat.slug}`}
              className="flex items-center gap-3 p-4 border border-line rounded-card bg-white hover:border-ink-3 hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 rounded-[10px] bg-cream-2 flex items-center justify-center shrink-0">
                <Icon name={cat.icon} size={20} color="#5a6275" />
              </div>
              <div>
                <div className="text-sm font-medium text-ink">{cat.label}</div>
                <div className="text-xs text-ink-4 mt-0.5">{cat.count} คอร์ส</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Courses ── */}
      <section className="px-12 pb-[72px]">
        <SectionHeader
          eyebrow="คอร์สยอดนิยม"
          title="เลือกเรียนจากผู้เชี่ยวชาญ"
          subtitle="คอร์สที่ได้รับการรีวิวดีที่สุด จากผู้สอนที่ได้รับการคัดเลือกอย่างเข้มงวด"
          action={
            <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm hover:text-coral transition-colors">
              ดูทั้งหมด <Icon name="arrow-right" size={15} />
            </Link>
          }
        />
        <div className="grid grid-cols-4 gap-5">
          {FEATURED_COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* ── Career Paths ── */}
      <section className="px-12 pb-[72px]">
        <SectionHeader
          eyebrow="เส้นทางอาชีพ"
          title={<>เรียนอย่างมีเป้าหมาย<br /><span className="italic text-coral">ไปถึงได้เร็วกว่า</span></>}
          subtitle="แพ็กเกจคอร์สที่ออกแบบร่วมกับผู้เชี่ยวชาญ เพื่อพาคุณไปสู่เป้าหมายอาชีพแบบมีระบบ"
        />
        <div className="grid grid-cols-4 gap-4">
          {CAREER_PATHS.map((path) => (
            <div
              key={path.id}
              className={`ph ${path.tint} p-6 rounded-card cursor-pointer hover:opacity-90 transition-opacity`}
              style={{ minHeight: 200 }}
            >
              <div className="text-white/60 font-mono text-[10px] uppercase tracking-widest mb-3">{path.level}</div>
              <h3 className="serif text-white text-xl font-medium leading-snug mb-4">{path.title}</h3>
              <div className="mt-auto flex flex-col gap-1">
                <div className="text-white/80 text-xs">{path.hours} · {path.courses}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trending Courses ── */}
      <section className="bg-cream-2 px-12 py-[72px]">
        <SectionHeader
          eyebrow="กำลังได้รับความนิยม"
          title="คอร์สมาแรงตอนนี้"
          action={
            <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm hover:text-coral transition-colors">
              ดูทั้งหมด <Icon name="arrow-right" size={15} />
            </Link>
          }
        />
        <div className="grid grid-cols-4 gap-5">
          {TRENDING_COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="px-12 py-[72px]">
        <div className="bg-ink rounded-hero p-16 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="font-mono text-[11px] text-coral uppercase tracking-widest mb-4">Pannya for Business</div>
            <h2 className="serif text-4xl font-medium text-paper leading-tight tracking-tight mb-4">
              อยากให้ทีมของคุณ<br />
              <span className="italic text-gold">เก่งขึ้นพร้อมกัน?</span>
            </h2>
            <p className="text-paper/60 max-w-lg mx-auto mb-8 leading-relaxed">
              Pannya for Business ช่วยให้องค์กรของคุณสร้างวัฒนธรรมการเรียนรู้
              ด้วยระบบจัดการ LMS และรายงานผลการเรียนแบบ real-time
            </p>
            <Link
              href="/business"
              className="inline-flex items-center gap-2 h-12 px-6 bg-coral text-white rounded-[10px] font-medium hover:bg-coral-dark transition-colors"
            >
              ดูแผน Pannya for Business <Icon name="arrow-right" size={16} color="#fff" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
