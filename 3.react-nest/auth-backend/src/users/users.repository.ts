// src/users/users.repository.ts
import { Injectable } from '@nestjs/common';
import { User } from './users.entity';

@Injectable()
export class UsersRepository {
  private users: User[] = [];
  private idCounter = 1;

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async create(userData: Partial<User>): Promise<User> {
    const newUser: User = {
      id: this.idCounter++,
      username: userData.username,
      password: userData.password,
      fullName: userData.fullName,
      email: userData.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  // For testing purposes, add some seed users
  seedUsers() {
    if (this.users.length === 0) {
      this.create({
        username: 'testuser',
        password: '$2b$10$8KvT4xA7Iajk2Nz.fS3Nju/eGHgBLAx.nZGnJnfwkbXc7PVxIEwDm', // 'password123'
        fullName: 'Test User',
        email: 'test@example.com',
      });
    }
  }
}
