import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      companyId: string;
      subscriptionActive: boolean;
    } & Session['user'];
  }

  interface User {
    role: string;
    companyId: string;
    subscriptionActive: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
    companyId?: string;
    subscriptionActive?: boolean;
  }
}
