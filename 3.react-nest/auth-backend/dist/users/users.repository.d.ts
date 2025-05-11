import { User } from './users.entity';
export declare class UsersRepository {
    private users;
    private idCounter;
    findOne(username: string): Promise<User | undefined>;
    findById(id: number): Promise<User | undefined>;
    create(userData: Partial<User>): Promise<User>;
    seedUsers(): void;
}
