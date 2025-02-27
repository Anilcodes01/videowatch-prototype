import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {

  const sessionCookie = request.cookies.get('authjs.session-token') ||
                       request.cookies.get('__Secure-authjs.session-token');
  
  const isAuthenticated = !!sessionCookie;
  const isAuthPage = request.nextUrl.pathname === '/';
  const isDashboardPage = request.nextUrl.pathname === '/dashboard';

  if (isAuthPage && isAuthenticated) {
    console.log('Redirecting to dashboard...');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isDashboardPage && !isAuthenticated) {
    console.log('Redirecting to login...');
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard'],
};