'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import type { Course } from '@/types';

interface Props {
  course: Course & { lastLesson: string };
  totalLessons: number;
  defaultProgress?: number;
}

export default function CourseProgressCard({ course, totalLessons, defaultProgress = 0 }: Props) {
  const [progress, setProgress] = useState(defaultProgress);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`pannya-progress-${course.id}`);
      if (raw) {
        const ids = JSON.parse(raw) as string[];
        const pct = totalLessons > 0 ? Math.round((ids.length / totalLessons) * 100) : 0;
        setProgress(pct);
      }
    } catch { /* use default */ }
  }, [course.id, totalLessons]);

  return (
    <div className="bg-white border border-line rounded-card p-5">
      <div className="flex gap-4">
        <div
          className={`ph ${course.tint} rounded-[8px] shrink-0`}
          style={{ width: 100, height: 70, fontSize: 10 }}
        >
          {course.thumb}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-ink-4 mb-1">{course.category}</div>
          <div className="text-sm font-semibold text-ink line-clamp-1 mb-1">{course.title}</div>
          <div className="text-xs text-ink-3 mb-3">ถัดไป: {course.lastLesson}</div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-cream-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-coral rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[11px] text-ink-4 font-mono w-8 text-right">{progress}%</span>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-cream-2 flex justify-end">
        <Link
          href={`/learn/${course.id}/l-001`}
          className="inline-flex items-center gap-2 h-9 px-4 bg-coral text-white rounded-control text-sm font-medium hover:bg-coral-dark transition-colors"
        >
          <Icon name="play" size={14} color="#fff" /> เรียนต่อ
        </Link>
      </div>
    </div>
  );
}
