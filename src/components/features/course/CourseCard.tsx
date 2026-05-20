'use client';

import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { formatPrice, discountPercent } from '@/lib/utils';
import type { Course } from '@/types';

interface CourseCardProps {
  course: Course;
  width?: string | number;
}

export default function CourseCard({ course: c, width }: CourseCardProps) {
  const thumbH = width ? `${Number(width) / 1.6}px` : '160px';
  return (
    <Link
      href={`/courses/${c.slug}`}
      className="block bg-white border border-line rounded-card overflow-hidden flex flex-col hover:shadow-md transition-shadow"
      style={{ width: width ?? '100%' }}
    >
      {/* Thumbnail */}
      <div className={`ph ${c.tint || 'dark'} relative`} style={{ height: thumbH }}>
        {c.badge && (
          <span className="absolute top-3 left-3 bg-black/55 text-white text-[10px] font-medium px-2 py-1 rounded uppercase tracking-wider">
            {c.badge}
          </span>
        )}
        <button
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          aria-label="บันทึก"
          onClick={(e) => e.preventDefault()}
        >
          <Icon name="bookmark" size={14} color="#fff" />
        </button>
        {c.thumb && (
          <span className="absolute bottom-3 left-3 font-mono text-[10px] opacity-70">{c.thumb}</span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2.5 p-[18px] flex-1">
        <div className="flex items-center gap-1.5 text-[11px] text-ink-4 uppercase tracking-widest">
          <span>{c.category}</span>
          <span>·</span>
          <span>{c.level}</span>
        </div>

        <h3 className="m-0 text-[15px] leading-snug font-semibold text-ink line-clamp-2 min-h-[42px]">
          {c.title}
        </h3>

        <div className="text-xs text-ink-3">{c.instructor}</div>

        <div className="flex items-center gap-3.5 text-[11px] text-ink-3 mt-auto">
          <span className="inline-flex items-center gap-1">
            <Icon name="star" size={12} color="#c9a14a" />
            {c.rating}
            <span className="text-ink-4">({c.reviews.toLocaleString()})</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Icon name="clock" size={12} /> {c.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <Icon name="book" size={12} /> {c.lessons} บท
          </span>
        </div>

        <div className="flex items-baseline gap-2.5 pt-2.5 border-t border-cream-2">
          <span className="text-[17px] font-semibold text-ink">{formatPrice(c.price)}</span>
          {c.oldPrice && (
            <>
              <span className="text-xs text-ink-4 line-through">{formatPrice(c.oldPrice)}</span>
              <span className="ml-auto text-[11px] text-coral font-medium">
                −{discountPercent(c.price, c.oldPrice)}%
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
