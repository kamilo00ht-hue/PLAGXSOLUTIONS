"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        this.users = [];
        this.sequence = 1;
    }
    async createUser(payload) {
        const existingUser = this.users.find((user) => user.email === payload.email.toLowerCase());
        if (existingUser) {
            throw new common_1.ConflictException('El correo ya está registrado');
        }
        const newUser = {
            id: this.sequence++,
            name: payload.name,
            email: payload.email.toLowerCase(),
            passwordHash: payload.passwordHash,
            role: payload.role
        };
        this.users.push(newUser);
        return newUser;
    }
    async findByEmail(email) {
        return this.users.find((user) => user.email === email.toLowerCase());
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map