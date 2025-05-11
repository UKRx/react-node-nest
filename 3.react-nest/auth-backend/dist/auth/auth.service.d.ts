import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(loginDto: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: any;
    }>;
    register(registerDto: {
        username: string;
        password: string;
        fullName: string;
        email: string;
        bio?: string;
        avatar?: string;
    }): Promise<{
        access_token: string;
        user: {
            id: number;
            username: string;
            fullName: string;
            email: string;
            bio?: string;
            avatar?: string;
        };
    }>;
}
