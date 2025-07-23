import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('authToken')?.value;

  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/verify-otp'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Protected routes
  const protectedRoutes = ['/profile'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // If user is not authenticated and trying to access protected route
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If user is authenticated and trying to access auth pages, redirect to profile
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // Redirect root to appropriate page
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/profile', request.url));
    } else {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
