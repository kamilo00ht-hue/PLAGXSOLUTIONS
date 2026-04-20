import { ConflictException, Injectable } from '@nestjs/common';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  private sequence = 1;

  async createUser(payload: {
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
  }): Promise<User> {
    const existingUser = this.users.find((user) => user.email === payload.email.toLowerCase());

    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    const newUser: User = {
      id: this.sequence++,
      name: payload.name,
      email: payload.email.toLowerCase(),
      passwordHash: payload.passwordHash,
      role: payload.role
    };

    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email.toLowerCase());
  }
}
