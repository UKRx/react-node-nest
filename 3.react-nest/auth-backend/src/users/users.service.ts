import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  private idCounter = 1;

  constructor() {
    // Add a test user
    this.createUser({
      username: 'testuser',
      password: 'password123',
      fullName: 'Test User',
      email: 'test@example.com',
      bio: 'This is a test user',
      avatar: 'https://via.placeholder.com/150',
    });
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    // Check if user already exists
    const existingUser = this.users.find(
      user => user.username === userData.username,
    );
    
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // Create new user
    const newUser: User = {
      id: this.idCounter++,
      ...userData,
      password: hashedPassword,
    };

    this.users.push(newUser);
    return newUser;
  }

  async getUserProfile(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.findById(id);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Remove password from response
    const { password, ...result } = user;
    return result;
  }
}
