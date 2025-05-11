import { User } from './users.model';
export declare class UsersService {
    private readonly users;
    private idCounter;
    constructor();
    findOne(username: string): Promise<User | undefined>;
    findById(id: number): Promise<User | undefined>;
    createUser(userData: Omit<User, 'id'>): Promise<User>;
    getUserProfile(id: number): Promise<Omit<User, 'password'>>;
}
