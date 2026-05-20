import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Server-side progress API (cookie-backed stub for Phase 2).
 * In Phase 4 this will persist to a real database via Prisma.
 *
 * Cookie format: pannya-progress-<courseId> = JSON array of completed lessonIds
 */

function progressKey(courseId: string) {
  return `pannya-progress-${courseId}`;
}

/** GET /api/progress?courseId=c-001 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');
  if (!courseId) return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });

  const store = await cookies();
  const raw = store.get(progressKey(courseId))?.value;
  const completedLessons: string[] = raw ? JSON.parse(raw) : [];
  return NextResponse.json({ courseId, completedLessons });
}

/** POST /api/progress  body: { courseId, lessonId, action: 'complete' | 'reset' } */
export async function POST(req: Request) {
  const body = await req.json() as { courseId: string; lessonId?: string; action: 'complete' | 'reset' };
  const { courseId, lessonId, action } = body;
  if (!courseId) return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });

  const store = await cookies();
  const raw = store.get(progressKey(courseId))?.value;
  let lessons: string[] = raw ? JSON.parse(raw) : [];

  if (action === 'complete' && lessonId) {
    if (!lessons.includes(lessonId)) lessons = [...lessons, lessonId];
  } else if (action === 'reset') {
    lessons = [];
  }

  const res = NextResponse.json({ courseId, completedLessons: lessons });
  res.cookies.set(progressKey(courseId), JSON.stringify(lessons), {
    httpOnly: false, // allow client JS to read for sync
    maxAge: 60 * 60 * 24 * 90, // 90 days
    path: '/',
    sameSite: 'lax',
  });
  return res;
}
