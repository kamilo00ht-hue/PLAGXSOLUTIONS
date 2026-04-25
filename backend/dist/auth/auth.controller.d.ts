import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
