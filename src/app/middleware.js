import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Add performance headers
  const response = NextResponse.next();
  
  // Cache static assets
  if (pathname.includes('/_next/static') || pathname.includes('/images') || pathname.includes('/favicon')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Handle authentication redirects
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    const token = request.cookies.get('user_token')?.value;
    const adminAuth = request.cookies.get('adminAuth')?.value;
    
    // Admin routes check
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/sign-in')) {
      if (!adminAuth || adminAuth !== 'true') {
        const url = request.nextUrl.clone();
        url.pathname = '/admin/sign-in';
        return NextResponse.redirect(url);
      }
    }
    
    // Dashboard routes check
    if (pathname.startsWith('/dashboard') && !token) {
      const url = request.nextUrl.clone();
      url.pathname = '/sign-in';
      return NextResponse.redirect(url);
    }
  }
  
  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
