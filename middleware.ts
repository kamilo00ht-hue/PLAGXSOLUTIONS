export { auth as middleware } from '@/lib/auth';

export const config = {
  matcher: ['/dashboard/:path*', '/clients/:path*', '/schedule/:path*', '/services/:path*', '/reports/:path*', '/settings/:path*', '/technicians/:path*']
};
