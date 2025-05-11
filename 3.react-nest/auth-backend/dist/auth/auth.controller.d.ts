import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
