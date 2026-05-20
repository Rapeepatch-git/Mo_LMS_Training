import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TopNav from '@/components/features/nav/TopNav';
import CourseForm from '@/components/features/admin/CourseForm';
import { getCourseById } from '@/lib/course-store';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'แก้ไขคอร์ส — Admin' };

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const store = await cookies();
  if (store.get('pannya-user-role')?.value !== 'admin') redirect('/login');

  const { id } = await params;
  const course = getCourseById(id);
  if (!course) notFound();

  return (
    <div className="min-h-screen bg-paper">
      <TopNav />
      <div className="px-12 py-10 max-w-3xl">
        <div className="font-mono text-[11px] text-plum uppercase tracking-widest mb-2">Admin › คอร์ส › แก้ไข</div>
        <h1 className="serif text-3xl font-medium text-ink mb-8">แก้ไขหลักสูตร</h1>
        <CourseForm mode="edit" courseId={id} defaultValues={course} />
      </div>
    </div>
  );
}
