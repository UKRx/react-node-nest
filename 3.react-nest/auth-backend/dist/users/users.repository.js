"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
let UsersRepository = class UsersRepository {
    constructor() {
        this.users = [];
        this.idCounter = 1;
    }
    async findOne(username) {
        return this.users.find(user => user.username === username);
    }
    async findById(id) {
        return this.users.find(user => user.id === id);
    }
    async create(userData) {
        const newUser = {
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
    seedUsers() {
        if (this.users.length === 0) {
            this.create({
                username: 'testuser',
                password: '$2b$10$8KvT4xA7Iajk2Nz.fS3Nju/eGHgBLAx.nZGnJnfwkbXc7PVxIEwDm',
                fullName: 'Test User',
                email: 'test@example.com',
            });
        }
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)()
], UsersRepository);
//# sourceMappingURL=users.repository.js.map