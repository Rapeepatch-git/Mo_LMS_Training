'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import { formatPrice } from '@/lib/utils';
import type { Course } from '@/types';

export default function AdminCourseRow({ course }: { course: Course }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`ลบคอร์ส "${course.title}" ใช่ไหม?`)) return;
    setDeleting(true);
    await fetch(`/api/admin/courses/${course.id}`, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <tr className="hover:bg-cream/40 transition-colors">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className={`ph ${course.tint} rounded-[6px] shrink-0`} style={{ width: 48, height: 34, fontSize: 8 }} />
          <div className="min-w-0">
            <div className="font-medium text-ink line-clamp-1">{course.title}</div>
            <div className="text-xs text-ink-4">{course.instructor}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-ink-3 text-xs">{course.category}</td>
      <td className="px-4 py-4 text-ink-3 text-xs">{course.level}</td>
      <td className="px-4 py-4 text-right font-mono text-ink text-xs">{formatPrice(course.price)}</td>
      <td className="px-5 py-4">
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/courses/${course.id}`}
            className="h-8 px-3 border border-line rounded-control text-xs text-ink-3 hover:bg-cream transition-colors inline-flex items-center gap-1.5"
          >
            <Icon name="settings" size={12} color="currentColor" /> แก้ไข
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="h-8 px-3 border border-coral/30 rounded-control text-xs text-coral hover:bg-coral/5 transition-colors inline-flex items-center gap-1.5 disabled:opacity-40"
          >
            <Icon name="x-circle" size={12} color="currentColor" /> {deleting ? '...' : 'ลบ'}
          </button>
        </div>
      </td>
    </tr>
  );
}
