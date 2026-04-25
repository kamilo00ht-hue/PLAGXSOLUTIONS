import { User, UserRole } from './entities/user.entity';
export declare class UsersService {
    private readonly users;
    private sequence;
    createUser(payload: {
        name: string;
        email: string;
        passwordHash: string;
        role: UserRole;
    }): Promise<User>;
    findByEmail(email: string): Promise<User | undefined>;
}
