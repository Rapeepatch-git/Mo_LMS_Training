import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TopNav from '@/components/features/nav/TopNav';
import Footer from '@/components/features/nav/Footer';
import CourseCard from '@/components/features/course/CourseCard';
import Icon from '@/components/ui/Icon';
import { INSTRUCTORS } from '@/data/instructors';
import { ALL_COURSES } from '@/data/courses';

export const revalidate = 3600;

export async function generateStaticParams() {
  return INSTRUCTORS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const instructor = INSTRUCTORS.find((i) => i.slug === slug);
  if (!instructor) return { title: 'ไม่พบผู้สอน' };
  return { title: `${instructor.name} — ผู้สอน`, description: instructor.bio };
}

export default async function InstructorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const instructor = INSTRUCTORS.find((i) => i.slug === slug);
  if (!instructor) notFound();

  const courses = ALL_COURSES.filter((c) => c.instructorSlug === slug);

  return (
    <div className="min-h-screen bg-paper">
      <TopNav />

      {/* Hero */}
      <div className="bg-ink px-12 py-14">
        <div className="flex items-start gap-10 max-w-4xl">
          <div
            className={`ph ${instructor.tint} rounded-hero shrink-0`}
            style={{ width: 140, height: 140, borderRadius: '50%' }}
          />
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[11px] text-coral uppercase tracking-widest mb-3">ผู้สอน</div>
            <h1 className="serif text-3xl font-medium text-paper leading-tight tracking-tight mb-1">
              {instructor.name}
            </h1>
            <div className="text-paper/60 text-sm mb-5">
              {instructor.title} · {instructor.organization}
            </div>
            <div className="flex items-center gap-6 text-sm text-paper/70">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="star" size={14} color="#c9a14a" />
                <strong className="text-gold">{instructor.rating}</strong> คะแนนเฉลี่ย
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="users" size={14} color="currentColor" />
                {instructor.students.toLocaleString()} ผู้เรียน
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="book" size={14} color="currentColor" />
                {instructor.courses} คอร์ส
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 py-10 grid gap-10" style={{ gridTemplateColumns: '1fr 280px' }}>
        {/* Left — bio + courses */}
        <div>
          <h2 className="serif text-xl font-medium text-ink mb-4">เกี่ยวกับผู้สอน</h2>
          <p className="text-ink-3 text-sm leading-relaxed mb-10">{instructor.bio}</p>

          {courses.length > 0 && (
            <>
              <h2 className="serif text-xl font-medium text-ink mb-5">
                หลักสูตรโดย {instructor.name}
              </h2>
              <div className="grid grid-cols-2 gap-5">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </>
          )}

          {courses.length === 0 && (
            <div className="py-10 text-center text-ink-4 text-sm border border-line rounded-card">
              ยังไม่มีคอร์สที่เผยแพร่
            </div>
          )}
        </div>

        {/* Right — stats card */}
        <div>
          <div className="bg-white border border-line rounded-card p-6 sticky top-8">
            <h3 className="font-medium text-ink mb-5 text-sm">สถิติผู้สอน</h3>
            <div className="space-y-4">
              {[
                { icon: 'star',  label: 'คะแนนเฉลี่ย',      value: `${instructor.rating} / 5.0`, color: '#c9a14a' },
                { icon: 'users', label: 'ผู้เรียนทั้งหมด',   value: instructor.students.toLocaleString(), color: '#5a6275' },
                { icon: 'book',  label: 'จำนวนคอร์ส',        value: `${instructor.courses} คอร์ส`, color: '#5a6275' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-[8px] bg-cream-2 flex items-center justify-center shrink-0">
                    <Icon name={s.icon} size={16} color={s.color} />
                  </div>
                  <div>
                    <div className="text-xs text-ink-4">{s.label}</div>
                    <div className="text-sm font-medium text-ink">{s.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
