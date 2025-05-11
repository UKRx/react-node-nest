"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor() {
        this.users = [];
        this.idCounter = 1;
        this.createUser({
            username: 'testuser',
            password: 'password123',
            fullName: 'Test User',
            email: 'test@example.com',
            bio: 'This is a test user',
            avatar: 'https://via.placeholder.com/150',
        });
    }
    async findOne(username) {
        return this.users.find(user => user.username === username);
    }
    async findById(id) {
        return this.users.find(user => user.id === id);
    }
    async createUser(userData) {
        const existingUser = this.users.find(user => user.username === userData.username);
        if (existingUser) {
            throw new Error('Username already exists');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        const newUser = {
            id: this.idCounter++,
            ...userData,
            password: hashedPassword,
        };
        this.users.push(newUser);
        return newUser;
    }
    async getUserProfile(id) {
        const user = await this.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const { password, ...result } = user;
        return result;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UsersService);
//# sourceMappingURL=users.service.js.map