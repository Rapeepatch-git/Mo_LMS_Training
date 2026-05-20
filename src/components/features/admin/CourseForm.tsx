'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Course } from '@/types';

type Mode = 'create' | 'edit';

const TINTS   = ['navy', 'coral', 'sage', 'gold', 'plum', 'cream', 'dark'] as const;
const LEVELS  = ['พื้นฐาน', 'ปานกลาง', 'ขั้นสูง'] as const;
const BADGES  = ['', 'BESTSELLER', 'NEW', 'HOT', 'SALE'] as const;

interface Props {
  mode: Mode;
  courseId?: string;
  defaultValues?: Partial<Course>;
}

const EMPTY: Partial<Course> = {
  title: '', instructor: '', category: '', categorySlug: '',
  level: 'พื้นฐาน', price: 0, tint: 'navy', duration: '', lessons: 0,
  description: '', badge: '', tags: [],
};

export default function CourseForm({ mode, courseId, defaultValues }: Props) {
  const router = useRouter();
  const init = { ...EMPTY, ...defaultValues };

  const [form, setForm] = useState({
    title:        init.title ?? '',
    instructor:   init.instructor ?? '',
    category:     init.category ?? '',
    categorySlug: init.categorySlug ?? '',
    level:        init.level ?? 'พื้นฐาน',
    price:        String(init.price ?? 0),
    oldPrice:     String(init.oldPrice ?? ''),
    duration:     init.duration ?? '',
    lessons:      String(init.lessons ?? 0),
    tint:         init.tint ?? 'navy',
    badge:        init.badge ?? '',
    description:  init.description ?? '',
    tags:         (init.tags ?? []).join(', '),
    thumb:        init.thumb ?? '',
    slug:         init.slug ?? '',
  });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.price) { setError('ชื่อคอร์สและราคาจำเป็นต้องกรอก'); return; }
    setError(''); setLoading(true);

    const payload: Omit<Course, 'id'> = {
      title:        form.title.trim(),
      instructor:   form.instructor.trim(),
      category:     form.category.trim(),
      categorySlug: form.categorySlug.trim() || form.category.trim().toLowerCase().replace(/\s+/g, '-'),
      level:        form.level as Course['level'],
      price:        Number(form.price),
      oldPrice:     form.oldPrice ? Number(form.oldPrice) : undefined,
      duration:     form.duration.trim(),
      lessons:      Number(form.lessons),
      tint:         form.tint as Course['tint'],
      badge:        form.badge || undefined,
      description:  form.description.trim(),
      tags:         form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      thumb:        form.thumb.trim() || form.title.trim(),
      slug:         form.slug.trim() || form.title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      rating:       init.rating ?? 0,
      reviews:      init.reviews ?? 0,
      instructorSlug: init.instructorSlug ?? '',
    };

    const url    = mode === 'create' ? '/api/admin/courses' : `/api/admin/courses/${courseId}`;
    const method = mode === 'create' ? 'POST' : 'PUT';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (res.ok) {
      router.push('/admin/courses');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? 'เกิดข้อผิดพลาด');
    }
  }

  const field = 'w-full h-10 px-3.5 border border-line rounded-control text-sm focus:outline-none focus:border-ink-3 bg-paper';
  const label = 'block text-sm font-medium text-ink mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-coral/5 border border-coral/20 rounded-control px-4 py-3 text-sm text-coral">{error}</div>
      )}

      {/* Basic info */}
      <div className="bg-white border border-line rounded-card p-6 space-y-5">
        <h2 className="font-medium text-ink text-sm">ข้อมูลพื้นฐาน</h2>

        <div>
          <label className={label}>ชื่อหลักสูตร *</label>
          <input className={field} value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="เช่น Python สำหรับนักลงทุน" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>ชื่อผู้สอน *</label>
            <input className={field} value={form.instructor} onChange={(e) => set('instructor', e.target.value)} placeholder="ดร.ชื่อ นามสกุล" />
          </div>
          <div>
            <label className={label}>Slug (URL)</label>
            <input className={field} value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="auto-generate ถ้าว่าง" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>หมวดหมู่</label>
            <input className={field} value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="เช่น การลงทุน" />
          </div>
          <div>
            <label className={label}>Category Slug</label>
            <input className={field} value={form.categorySlug} onChange={(e) => set('categorySlug', e.target.value)} placeholder="investing" />
          </div>
        </div>
        <div>
          <label className={label}>คำอธิบายหลักสูตร</label>
          <textarea
            className="w-full px-3.5 py-2.5 border border-line rounded-control text-sm focus:outline-none focus:border-ink-3 bg-paper resize-none"
            rows={3} value={form.description} onChange={(e) => set('description', e.target.value)}
            placeholder="อธิบายสั้นๆ ว่าคอร์สนี้สอนอะไร"
          />
        </div>
        <div>
          <label className={label}>Tags (คั่นด้วยจุลภาค)</label>
          <input className={field} value={form.tags} onChange={(e) => set('tags', e.target.value)} placeholder="หุ้น, VI, งบการเงิน" />
        </div>
      </div>

      {/* Pricing & details */}
      <div className="bg-white border border-line rounded-card p-6 space-y-5">
        <h2 className="font-medium text-ink text-sm">ราคาและรายละเอียด</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={label}>ราคา (฿) *</label>
            <input type="number" min="0" className={field} value={form.price} onChange={(e) => set('price', e.target.value)} />
          </div>
          <div>
            <label className={label}>ราคาเดิม (฿)</label>
            <input type="number" min="0" className={field} value={form.oldPrice} onChange={(e) => set('oldPrice', e.target.value)} placeholder="เว้นว่างถ้าไม่ลด" />
          </div>
          <div>
            <label className={label}>ระดับ</label>
            <select className={field} value={form.level} onChange={(e) => set('level', e.target.value)}>
              {LEVELS.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={label}>ความยาวคอร์ส</label>
            <input className={field} value={form.duration} onChange={(e) => set('duration', e.target.value)} placeholder="8 ชม. 24 นาที" />
          </div>
          <div>
            <label className={label}>จำนวนบทเรียน</label>
            <input type="number" min="0" className={field} value={form.lessons} onChange={(e) => set('lessons', e.target.value)} />
          </div>
          <div>
            <label className={label}>Badge</label>
            <select className={field} value={form.badge} onChange={(e) => set('badge', e.target.value)}>
              {BADGES.map((b) => <option key={b} value={b}>{b || '— ไม่มี —'}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white border border-line rounded-card p-6 space-y-4">
        <h2 className="font-medium text-ink text-sm">ธีมสี (Thumbnail)</h2>
        <div className="flex gap-3">
          {TINTS.map((t) => (
            <button
              key={t} type="button"
              onClick={() => set('tint', t)}
              className={`flex-1 h-14 rounded-[8px] ph ${t} relative transition-all ${form.tint === t ? 'ring-2 ring-offset-2 ring-ink' : 'opacity-60 hover:opacity-90'}`}
            >
              {form.tint === t && (
                <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">✓</span>
              )}
            </button>
          ))}
        </div>
        <div>
          <label className={label}>Thumb label (ข้อความบน placeholder)</label>
          <input className={field} value={form.thumb} onChange={(e) => set('thumb', e.target.value)} placeholder="เว้นว่าง = ใช้ชื่อคอร์ส" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="h-11 px-8 bg-coral text-white rounded-control font-medium hover:bg-coral-dark transition-colors disabled:opacity-60"
        >
          {loading ? 'กำลังบันทึก...' : mode === 'create' ? 'สร้างหลักสูตร' : 'บันทึกการแก้ไข'}
        </button>
        <Link href="/admin/courses" className="h-11 px-6 border border-line rounded-control text-sm text-ink-3 hover:bg-cream transition-colors inline-flex items-center">
          ยกเลิก
        </Link>
      </div>
    </form>
  );
}
