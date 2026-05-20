import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import type { Course } from '@/types';

export default function CourseCardHorizontal({ course: c }: { course: Course }) {
  return (
    <Link
      href={`/courses/${c.slug}`}
      className="flex gap-3.5 p-3.5 bg-white border border-line rounded-[10px] hover:shadow-sm transition-shadow"
    >
      <div
        className={`ph ${c.tint || 'dark'} rounded-[6px] shrink-0`}
        style={{ width: 120, height: 80, fontSize: 10 }}
      >
        {c.thumb ?? ''}
      </div>
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <div className="text-[10px] text-ink-4 uppercase tracking-widest">{c.category}</div>
        <div className="text-[13px] font-semibold text-ink leading-snug line-clamp-2">{c.title}</div>
        <div className="text-[11px] text-ink-3">{c.instructor}</div>
        <div className="flex items-center gap-2.5 text-[11px] text-ink-3 mt-auto">
          <span className="inline-flex items-center gap-1">
            <Icon name="star" size={11} color="#c9a14a" /> {c.rating}
          </span>
          <span className="inline-flex items-center gap-1">
            <Icon name="clock" size={11} /> {c.duration}
          </span>
        </div>
      </div>
    </Link>
  );
}
