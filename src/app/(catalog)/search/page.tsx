import type { Metadata } from 'next';
import Link from 'next/link';
import TopNav from '@/components/features/nav/TopNav';
import Footer from '@/components/features/nav/Footer';
import CourseCard from '@/components/features/course/CourseCard';
import Icon from '@/components/ui/Icon';
import { ALL_COURSES } from '@/data/courses';
import type { Course } from '@/types';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q ? `ผลลัพธ์: "${q}"` : 'ค้นหาคอร์ส' };
}

function searchCourses(query: string): Course[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return ALL_COURSES.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.tags?.some((t) => t.toLowerCase().includes(q))
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; level?: string; category?: string }>;
}) {
  const { q = '', level, category } = await searchParams;

  let results = searchCourses(q);

  if (level) results = results.filter((c) => c.level === level);
  if (category) results = results.filter((c) => c.categorySlug === category);

  return (
    <div className="min-h-screen bg-paper">
      <TopNav />

      {/* Search bar hero */}
      <div className="bg-ink px-12 py-10">
        <form method="GET" action="/search" className="max-w-2xl mx-auto">
          <label className="block text-paper/60 text-xs font-mono uppercase tracking-widest mb-3">
            ค้นหาหลักสูตร
          </label>
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-3 bg-white/10 border border-white/20 rounded-control px-4 h-12 focus-within:border-white/40 transition-colors">
              <Icon name="search" size={18} color="rgba(255,255,255,.5)" />
              <input
                name="q"
                defaultValue={q}
                placeholder="เช่น Value Investing, Python, ภาษาเกาหลี..."
                autoFocus
                className="flex-1 bg-transparent text-paper placeholder-white/30 text-sm focus:outline-none"
              />
              {q && (
                <Link href="/search" className="text-white/40 hover:text-white/70 transition-colors">
                  <Icon name="x-circle" size={16} color="currentColor" />
                </Link>
              )}
            </div>
            <button
              type="submit"
              className="h-12 px-6 bg-coral text-white rounded-control font-medium hover:bg-coral-dark transition-colors shrink-0"
            >
              ค้นหา
            </button>
          </div>
        </form>
      </div>

      <div className="px-12 py-8">
        {/* Filters row */}
        {q && (
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <span className="text-sm text-ink-3">
              {results.length > 0
                ? <>พบ <strong className="text-ink">{results.length}</strong> คอร์สสำหรับ &ldquo;<strong className="text-ink">{q}</strong>&rdquo;</>
                : <>ไม่พบผลลัพธ์สำหรับ &ldquo;<strong className="text-ink">{q}</strong>&rdquo;</>
              }
            </span>
            <div className="flex gap-2 ml-auto flex-wrap">
              {['พื้นฐาน', 'ปานกลาง', 'ขั้นสูง'].map((lv) => (
                <Link
                  key={lv}
                  href={`/search?q=${encodeURIComponent(q)}&level=${encodeURIComponent(lv)}`}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    level === lv
                      ? 'bg-ink text-paper border-ink'
                      : 'border-line text-ink-3 hover:border-ink-3'
                  }`}
                >
                  {lv}
                </Link>
              ))}
              {(level || category) && (
                <Link
                  href={`/search?q=${encodeURIComponent(q)}`}
                  className="px-3 py-1 text-xs rounded-full border border-coral text-coral hover:bg-coral-soft transition-colors"
                >
                  ล้างตัวกรอง
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {!q ? (
          /* Empty state — show suggestions */
          <div className="text-center py-20">
            <Icon name="search" size={40} color="#e6e2d8" className="mx-auto mb-4" />
            <h2 className="serif text-xl font-medium text-ink mb-2">ค้นหาหลักสูตรที่ใช่</h2>
            <p className="text-ink-3 text-sm mb-8">ลองค้นหาทักษะ หมวดหมู่ หรือชื่ออาจารย์</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Value Investing', 'Python', 'ภาษาเกาหลี', 'Excel', 'Facebook Ads', 'Design Thinking'].map((s) => (
                <Link
                  key={s}
                  href={`/search?q=${encodeURIComponent(s)}`}
                  className="px-3 py-1.5 text-sm border border-line rounded-full text-ink-3 hover:border-ink-3 hover:text-ink transition-colors"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          /* No results */
          <div className="text-center py-20">
            <Icon name="x-circle" size={40} color="#e6e2d8" className="mx-auto mb-4" />
            <h2 className="serif text-xl font-medium text-ink mb-2">ไม่พบผลลัพธ์</h2>
            <p className="text-ink-3 text-sm mb-6">
              ลองใช้คำค้นหาอื่น หรือดูหลักสูตรทั้งหมด
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 h-10 px-5 bg-coral text-white rounded-control font-medium hover:bg-coral-dark transition-colors"
            >
              ดูหลักสูตรทั้งหมด <Icon name="arrow-right" size={15} color="#fff" />
            </Link>
          </div>
        ) : (
          /* Results grid */
          <div className="grid grid-cols-4 gap-5">
            {results.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
