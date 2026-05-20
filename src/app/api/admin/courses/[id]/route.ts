import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { updateCourse, deleteCourse } from '@/lib/course-store';
import type { Course } from '@/types';

async function requireAdmin() {
  const store = await cookies();
  return store.get('pannya-user-role')?.value === 'admin';
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { id } = await params;
  const body = await req.json() as Partial<Course>;
  const updated = updateCourse(id, body);
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { id } = await params;
  const ok = deleteCourse(id);
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
