export type UserRole = 'admin' | 'tecnico' | 'cliente';
export declare class User {
    id: number;
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
}
