import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        id: number;
        name: string;
        email: string;
        role: import("../users/entities/user.entity").UserRole;
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        tokenType: string;
    }>;
}
