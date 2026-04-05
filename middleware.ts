import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export default auth((req) => {
  if (!req.auth?.user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (!req.auth.user.subscriptionActive) {
    return NextResponse.redirect(new URL('/billing', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard/:path*', '/clients/:path*', '/schedule/:path*', '/services/:path*', '/reports/:path*', '/settings/:path*', '/technicians/:path*']
};
