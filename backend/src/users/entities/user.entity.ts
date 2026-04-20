export type UserRole = 'admin' | 'tecnico' | 'cliente';

export class User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}
