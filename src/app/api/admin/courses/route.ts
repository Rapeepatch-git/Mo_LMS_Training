import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAllCourses, createCourse } from '@/lib/course-store';
import type { Course } from '@/types';

async function requireAdmin() {
  const store = await cookies();
  return store.get('pannya-user-role')?.value === 'admin';
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  return NextResponse.json(getAllCourses());
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json() as Omit<Course, 'id'>;
  if (!body.title || !body.price) {
    return NextResponse.json({ error: 'title and price are required' }, { status: 400 });
  }
  const course = createCourse(body);
  return NextResponse.json(course, { status: 201 });
}
