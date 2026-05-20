import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import TopNav from '@/components/features/nav/TopNav';
import CourseForm from '@/components/features/admin/CourseForm';

export const metadata: Metadata = { title: 'สร้างคอร์สใหม่ — Admin' };

export default async function NewCoursePage() {
  const store = await cookies();
  if (store.get('pannya-user-role')?.value !== 'admin') redirect('/login');
  return (
    <div className="min-h-screen bg-paper">
      <TopNav />
      <div className="px-12 py-10 max-w-3xl">
        <div className="font-mono text-[11px] text-plum uppercase tracking-widest mb-2">Admin › คอร์ส › ใหม่</div>
        <h1 className="serif text-3xl font-medium text-ink mb-8">สร้างหลักสูตรใหม่</h1>
        <CourseForm mode="create" />
      </div>
    </div>
  );
}
