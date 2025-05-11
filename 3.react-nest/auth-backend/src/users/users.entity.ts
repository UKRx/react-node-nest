// src/users/user.entity.ts
export class User {
  id: number;
  username: string;
  password: string;
  fullName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
