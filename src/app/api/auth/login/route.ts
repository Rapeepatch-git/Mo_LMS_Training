import { NextResponse } from 'next/server';

const MOCK_USERS = [
  { email: 'ABCD@gmail.com',  password: '1234',       name: 'ABCD',  initials: 'AB', role: 'user'  },
  { email: 'admin@gmail.com', password: 'admin1234',  name: 'Admin', initials: 'AD', role: 'admin' },
];

const COOKIE_OPTS = {
  httpOnly: false,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',
  sameSite: 'lax',
} as const;

export async function POST(req: Request) {
  const { email, password } = await req.json() as { email: string; password: string };

  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return NextResponse.json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, name: user.name, role: user.role });
  res.cookies.set('pannya-auth-token', `mock-${user.email}`, COOKIE_OPTS);
  res.cookies.set('pannya-user-role', user.role, COOKIE_OPTS);
  res.cookies.set('pannya-user-name', user.name, COOKIE_OPTS);
  res.cookies.set('pannya-user-initials', user.initials, COOKIE_OPTS);
  return res;
}
