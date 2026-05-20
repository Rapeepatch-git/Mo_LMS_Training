import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  for (const name of ['pannya-auth-token', 'pannya-user-role', 'pannya-user-name', 'pannya-user-initials']) {
    res.cookies.set(name, '', { maxAge: 0, path: '/' });
  }
  return res;
}
