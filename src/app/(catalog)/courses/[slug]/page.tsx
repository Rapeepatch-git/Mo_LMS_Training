import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import TopNav from '@/components/features/nav/TopNav';
import Footer from '@/components/features/nav/Footer';
import Icon from '@/components/ui/Icon';
import AddToCartButton from '@/components/features/course/AddToCartButton';
import { getCourseBySlug, ALL_COURSES, COURSE_SECTIONS } from '@/data/courses';
import { formatPrice, discountPercent } from '@/lib/utils';

export const revalidate = 3600;

export async function generateStaticParams() {
  return ALL_COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: 'ไม่พบคอร์ส' };
  return {
    title: course.title,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const totalLessons = COURSE_SECTIONS.reduce((acc, s) => acc + s.lessons.length, 0);

  return (
    <div className="min-h-screen bg-paper">
      {/* Dark header zone */}
      <div className="bg-ink">
        <TopNav active="browse" dark />

        <div className="px-12 py-12 grid gap-16" style={{ gridTemplateColumns: '1fr 360px' }}>
          <div>
            <div className="flex items-center gap-2 text-xs text-paper/50 mb-4">
              <Link href="/courses" className="hover:text-paper/80 transition-colors">หลักสูตรทั้งหมด</Link>
              <Icon name="chevron-right" size={13} color="currentColor" />
              <span className="text-paper/70">{course.category}</span>
            </div>

            {course.badge && (
              <span className="inline-block bg-coral text-white text-[10px] font-medium px-2.5 py-1 rounded uppercase tracking-wider mb-4">
                {course.badge}
              </span>
            )}

            <h1 className="serif text-3xl font-medium text-paper leading-snug tracking-tight mb-4">
              {course.title}
            </h1>
            <p className="text-paper/70 text-sm leading-relaxed mb-6 max-w-xl">{course.description}</p>

            <div className="flex items-center gap-6 text-sm text-paper/70 mb-6">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="star" size={14} color="#c9a14a" />
                <strong className="text-gold">{course.rating}</strong>
                <span>({course.reviews.toLocaleString()} รีวิว)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="users" size={14} color="currentColor" />
                {(course.reviews * 4).toLocaleString()} ผู้เรียน
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="clock" size={14} color="currentColor" />
                {course.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="book" size={14} color="currentColor" />
                {course.lessons} บท
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className={`ph ${course.tint} w-10 h-10 rounded-full shrink-0`} />
              <div>
                <div className="text-paper text-sm font-medium">{course.instructor}</div>
                <div className="text-paper/50 text-xs">ผู้สอน</div>
              </div>
            </div>
          </div>

          {/* Sticky buy card — positioned in dark header for visual */}
          <div className="bg-paper rounded-card p-6 shadow-xl self-start">
            <div className={`ph ${course.tint} rounded-[8px] mb-5 text-sm`} style={{ height: 180 }}>
              {course.thumb}
            </div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-semibold text-ink">{formatPrice(course.price)}</span>
              {course.oldPrice && (
                <>
                  <span className="text-sm text-ink-4 line-through">{formatPrice(course.oldPrice)}</span>
                  <span className="text-sm text-coral font-medium">−{discountPercent(course.price, course.oldPrice)}%</span>
                </>
              )}
            </div>
            <Link
              href={`/learn/${course.id}/l-001`}
              className="flex items-center justify-center gap-2 h-12 bg-coral text-white rounded-control font-medium mb-3 hover:bg-coral-dark transition-colors"
            >
              ลงทะเบียนเรียน <Icon name="arrow-right" size={16} color="#fff" />
            </Link>
            <AddToCartButton
              item={{
                courseId: course.id ?? course.slug,
                slug: course.slug,
                title: course.title,
                instructor: course.instructor,
                price: course.price,
                oldPrice: course.oldPrice,
                tint: course.tint,
                thumb: course.thumb,
              }}
              className="w-full h-10 rounded-control text-sm mb-3"
            />
            <div className="mt-4 space-y-2 text-xs text-ink-3">
              {['เรียนได้ตลอดชีพ', 'ใบประกาศนียบัตรเมื่อจบหลักสูตร', 'เข้าถึงบน Mobile และ Desktop', 'อัปเดตเนื้อหาฟรี'].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Icon name="check" size={13} color="#6a8f6a" /> {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course content */}
      <div className="px-12 py-10 max-w-[800px]">
        <h2 className="serif text-2xl font-medium text-ink mb-6">เนื้อหาหลักสูตร</h2>
        <div className="flex items-center gap-4 text-sm text-ink-3 mb-6">
          <span>{COURSE_SECTIONS.length} ส่วน</span>
          <span>·</span>
          <span>{totalLessons} บท</span>
          <span>·</span>
          <span>{course.duration}</span>
        </div>

        <div className="space-y-2">
          {COURSE_SECTIONS.map((section) => (
            <div key={section.id} className="border border-line rounded-card overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 bg-cream-2 font-medium text-sm">
                <span>{section.title}</span>
                <span className="text-ink-4 text-xs">{section.lessons.length} บท</span>
              </div>
              <div className="divide-y divide-line">
                {section.lessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center gap-3 px-5 py-3 text-sm">
                    {lesson.isCompleted ? (
                      <Icon name="check-circle" size={16} color="#6a8f6a" />
                    ) : lesson.isPreview ? (
                      <Icon name="play" size={16} color="#d4623f" />
                    ) : (
                      <Icon name="lock" size={16} color="#8a92a6" />
                    )}
                    <span className="flex-1 text-ink-3">{lesson.title}</span>
                    {lesson.isPreview && (
                      <span className="text-xs text-coral font-medium">ดูตัวอย่างฟรี</span>
                    )}
                    <span className="text-xs text-ink-4 font-mono">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
