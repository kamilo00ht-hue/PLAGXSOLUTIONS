import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      userId: string;
      role: string;
      companyId: string;
      subscriptionActive: boolean;
    } & Session['user'];
  }

  interface User {
    userId: string;
    role: string;
    companyId: string;
    subscriptionActive: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string;
    role?: string;
    companyId?: string;
    subscriptionActive?: boolean;
  }
}
