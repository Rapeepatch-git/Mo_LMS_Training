import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_PATHS = ['/dashboard', '/learn', '/certificate', '/cart', '/checkout', '/settings', '/notifications'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  // Check for auth token cookie (replace with real Auth.js check in Phase 2)
  const token = request.cookies.get('pannya-auth-token')?.value;
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/learn/:path*',
    '/certificate/:path*',
    '/cart/:path*',
    '/checkout/:path*',
    '/settings/:path*',
    '/notifications/:path*',
  ],
};
