import type { Metadata } from 'next';
import Link from 'next/link';
import TopNav from '@/components/features/nav/TopNav';
import Footer from '@/components/features/nav/Footer';
import CourseCardHorizontal from '@/components/features/course/CourseCardHorizontal';
import CourseProgressCard from '@/components/features/dashboard/CourseProgressCard';
import Icon from '@/components/ui/Icon';
import { FEATURED_COURSES, COURSE_SECTIONS } from '@/data/courses';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'แดชบอร์ด' };

const TOTAL_LESSONS = COURSE_SECTIONS.flatMap((s) => s.lessons).length;

const IN_PROGRESS = [
  { ...FEATURED_COURSES[0], lastLesson: 'งบดุล (Balance Sheet)' },
  { ...FEATURED_COURSES[1], lastLesson: 'สร้าง Prompt สำหรับนักวิเคราะห์' },
  { ...FEATURED_COURSES[2], lastLesson: 'Empathy Map Workshop' },
];

const ACTIVITY = [
  { date: 'วันนี้',      label: 'เรียน "งบดุล (Balance Sheet)"', duration: '28 นาที', icon: 'play'  },
  { date: 'เมื่อวาน',    label: 'จบบท "Value Investing คืออะไร"', duration: '14 นาที', icon: 'check' },
  { date: '2 วันที่แล้ว', label: 'เริ่มคอร์ส AI Cowork 101',       duration: '52 นาที', icon: 'play'  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-paper">
      <TopNav />

      <div className="px-12 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="font-mono text-[11px] text-coral uppercase tracking-widest mb-2">แดชบอร์ด</div>
            <h1 className="serif text-3xl font-medium text-ink tracking-tight">
              สวัสดี, <span className="italic text-coral">ภณวัฒน์</span>
            </h1>
            <p className="text-ink-3 text-sm mt-1">เรียนต่อจากที่ค้างไว้ หรือสำรวจคอร์สใหม่</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center px-5 py-3 bg-white border border-line rounded-card">
              <div className="serif text-2xl font-medium text-ink">12</div>
              <div className="text-xs text-ink-4 mt-0.5">วันติดต่อกัน</div>
            </div>
            <div className="text-center px-5 py-3 bg-white border border-line rounded-card">
              <div className="serif text-2xl font-medium text-ink">3</div>
              <div className="text-xs text-ink-4 mt-0.5">คอร์สที่กำลังเรียน</div>
            </div>
            <div className="text-center px-5 py-3 bg-white border border-line rounded-card">
              <div className="serif text-2xl font-medium text-sage">1</div>
              <div className="text-xs text-ink-4 mt-0.5">ใบประกาศนียบัตร</div>
            </div>
          </div>
        </div>

        <div className="grid gap-8" style={{ gridTemplateColumns: '1fr 320px' }}>
          {/* Left column */}
          <div className="space-y-8">
            {/* In-progress courses */}
            <section>
              <h2 className="serif text-xl font-medium text-ink mb-5">กำลังเรียน</h2>
              <div className="space-y-4">
                {IN_PROGRESS.map((item) => (
                  <CourseProgressCard
                    key={item.id}
                    course={item}
                    totalLessons={TOTAL_LESSONS}
                  />
                ))}
              </div>
            </section>

            {/* Recent activity */}
            <section>
              <h2 className="serif text-xl font-medium text-ink mb-5">กิจกรรมล่าสุด</h2>
              <div className="space-y-3">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white border border-line rounded-card">
                    <div className="w-8 h-8 rounded-full bg-cream-2 flex items-center justify-center shrink-0">
                      <Icon name={a.icon} size={15} color="#5a6275" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-ink line-clamp-1">{a.label}</div>
                      <div className="text-xs text-ink-4">{a.date}</div>
                    </div>
                    <span className="text-xs text-ink-4 font-mono shrink-0">{a.duration}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Certificate */}
            <div className="bg-ink rounded-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="award" size={16} color="#c9a14a" />
                <span className="text-gold text-xs font-medium uppercase tracking-wider">ใบประกาศนียบัตร</span>
              </div>
              <div className="text-paper text-sm font-medium mb-1">Value Investing Fundamentals</div>
              <div className="text-paper/50 text-xs mb-4">ออกให้ 15 พ.ค. 2026</div>
              <Link
                href="/certificate/cert-001"
                className="flex items-center justify-center gap-2 h-9 bg-gold/20 text-gold border border-gold/30 rounded-control text-sm hover:bg-gold/30 transition-colors"
              >
                <Icon name="download" size={14} color="#c9a14a" /> ดูใบประกาศ
              </Link>
            </div>

            {/* Recommended */}
            <div>
              <h3 className="serif text-lg font-medium text-ink mb-4">แนะนำสำหรับคุณ</h3>
              <div className="space-y-3">
                {FEATURED_COURSES.slice(0, 3).map((course) => (
                  <CourseCardHorizontal key={course.id} course={course} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
