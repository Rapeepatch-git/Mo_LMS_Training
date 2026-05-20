import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import TopNav from '@/components/features/nav/TopNav';
import Icon from '@/components/ui/Icon';
import { getAllCourses } from '@/lib/course-store';
import AdminCourseRow from '@/components/features/admin/AdminCourseRow';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'จัดการคอร์ส — Admin' };

export default async function AdminCoursesPage() {
  const store = await cookies();
  if (store.get('pannya-user-role')?.value !== 'admin') redirect('/login');

  const courses = getAllCourses();

  return (
    <div className="min-h-screen bg-paper">
      <TopNav />
      <div className="px-12 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="font-mono text-[11px] text-plum uppercase tracking-widest mb-2">Admin › คอร์ส</div>
            <h1 className="serif text-3xl font-medium text-ink">จัดการหลักสูตร</h1>
          </div>
          <Link
            href="/admin/courses/new"
            className="inline-flex items-center gap-2 h-10 px-5 bg-coral text-white rounded-control font-medium hover:bg-coral-dark transition-colors"
          >
            <Icon name="plus" size={16} color="#fff" /> สร้างคอร์สใหม่
          </Link>
        </div>

        <div className="bg-white border border-line rounded-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-cream-2">
                <th className="text-left px-5 py-3 text-xs text-ink-4 font-medium">คอร์ส</th>
                <th className="text-left px-4 py-3 text-xs text-ink-4 font-medium">หมวดหมู่</th>
                <th className="text-left px-4 py-3 text-xs text-ink-4 font-medium">ระดับ</th>
                <th className="text-right px-4 py-3 text-xs text-ink-4 font-medium">ราคา</th>
                <th className="text-right px-5 py-3 text-xs text-ink-4 font-medium">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {courses.map((c) => (
                <AdminCourseRow key={c.id} course={c} />
              ))}
            </tbody>
          </table>
          {courses.length === 0 && (
            <div className="text-center py-16 text-ink-4 text-sm">ยังไม่มีคอร์ส</div>
          )}
        </div>
      </div>
    </div>
  );
}
