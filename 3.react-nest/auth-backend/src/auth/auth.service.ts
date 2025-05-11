import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: { username: string; password: string }) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload = { username: user.username, sub: user.id };
    
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(registerDto: { username: string; password: string; fullName: string; email: string; bio?: string; avatar?: string }) {
    try {
      const user = await this.usersService.createUser(registerDto);
      const { password, ...result } = user;
      
      const payload = { username: user.username, sub: user.id };
      
      return {
        access_token: this.jwtService.sign(payload),
        user: result,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
