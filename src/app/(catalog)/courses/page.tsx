import type { Metadata } from 'next';
import TopNav from '@/components/features/nav/TopNav';
import Footer from '@/components/features/nav/Footer';
import CourseCard from '@/components/features/course/CourseCard';
import SectionHeader from '@/components/ui/SectionHeader';
import Icon from '@/components/ui/Icon';
import { ALL_COURSES } from '@/data/courses';
import { CATEGORIES, NAV_FILTERS } from '@/data/categories';

export const metadata: Metadata = { title: 'หลักสูตรทั้งหมด' };
export const revalidate = 3600;

const LEVELS = ['ทุกระดับ', 'พื้นฐาน', 'ปานกลาง', 'ขั้นสูง'];
const SORT_OPTIONS = [
  { value: 'popular', label: 'ยอดนิยม' },
  { value: 'rating',  label: 'คะแนนสูงสุด' },
  { value: 'newest',  label: 'ใหม่ล่าสุด' },
  { value: 'price-asc', label: 'ราคาต่ำ-สูง' },
];

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-paper">
      <TopNav active="browse" />

      {/* Page header */}
      <div className="bg-ink px-12 py-12">
        <div className="font-mono text-[11px] text-coral uppercase tracking-widest mb-3">หลักสูตรทั้งหมด</div>
        <h1 className="serif text-4xl font-medium text-paper leading-tight tracking-tight mb-2">
          เรียนรู้จากผู้เชี่ยวชาญตัวจริง
        </h1>
        <p className="text-paper/60 text-sm">กว่า 1,284 คอร์สใน 8 หมวดหมู่ — อัปเดตทุกสัปดาห์</p>
      </div>

      {/* Category nav */}
      <div className="border-b border-line bg-white px-12">
        <div className="flex gap-1 overflow-x-auto py-1">
          {NAV_FILTERS.map((f) => (
            <button
              key={f.id}
              className="shrink-0 px-4 py-2.5 text-sm rounded-control hover:bg-cream transition-colors whitespace-nowrap"
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-12 py-8 flex gap-8">
        {/* ── Sidebar filters ── */}
        <aside className="w-56 shrink-0">
          <div className="sticky top-8 space-y-6">
            <div>
              <div className="font-medium text-sm mb-3 text-ink">ระดับ</div>
              <div className="space-y-2">
                {LEVELS.map((l) => (
                  <label key={l} className="flex items-center gap-2.5 text-sm text-ink-3 cursor-pointer hover:text-ink">
                    <input type="checkbox" className="rounded w-4 h-4 accent-coral" />
                    {l}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="font-medium text-sm mb-3 text-ink">ราคา</div>
              <div className="space-y-2">
                {['ทุกราคา', 'เรียนฟรี', 'ไม่เกิน ฿1,000', 'ไม่เกิน ฿2,000', 'ไม่เกิน ฿3,000'].map((p) => (
                  <label key={p} className="flex items-center gap-2.5 text-sm text-ink-3 cursor-pointer hover:text-ink">
                    <input type="radio" name="price" className="w-4 h-4 accent-coral" />
                    {p}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="font-medium text-sm mb-3 text-ink">หมวดหมู่</div>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <label key={cat.slug} className="flex items-center gap-2.5 text-sm text-ink-3 cursor-pointer hover:text-ink">
                    <input type="checkbox" className="rounded w-4 h-4 accent-coral" />
                    <span className="flex-1">{cat.label}</span>
                    <span className="text-[11px] text-ink-4">{cat.count}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Course grid ── */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-ink-3">
              แสดง <strong className="text-ink">{ALL_COURSES.length}</strong> คอร์ส
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-ink-3">เรียงตาม</span>
              <div className="relative">
                <select className="appearance-none pl-3 pr-8 h-9 border border-line rounded-control text-sm bg-white focus:outline-none focus:border-ink-3">
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <Icon name="chevron-down" size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-ink-4" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {ALL_COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
