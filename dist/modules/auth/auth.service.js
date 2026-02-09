"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const drizzle_1 = require("../../database/drizzle");
const user_schema_1 = require("../../database/schema/user.schema");
const drizzle_orm_1 = require("drizzle-orm");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async register(email, password, role) {
        const existingUser = await drizzle_1.db
            .select()
            .from(user_schema_1.users)
            .where((0, drizzle_orm_1.eq)(user_schema_1.users.email, email))
            .limit(1);
        if (existingUser.length > 0) {
            throw new common_1.ConflictException('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [user] = await drizzle_1.db
            .insert(user_schema_1.users)
            .values({
            email,
            password: hashedPassword,
            role,
        })
            .returning({
            id: user_schema_1.users.id,
            role: user_schema_1.users.role,
        });
        const tokens = await this.generateTokens(user.id, user.role);
        await drizzle_1.db
            .update(user_schema_1.users)
            .set({
            refreshToken: await bcrypt.hash(tokens.refreshToken, 10),
        })
            .where((0, drizzle_orm_1.eq)(user_schema_1.users.id, user.id));
        return tokens;
    }
    async login(email, password) {
        const result = await drizzle_1.db
            .select()
            .from(user_schema_1.users)
            .where((0, drizzle_orm_1.eq)(user_schema_1.users.email, email))
            .limit(1);
        const user = result[0];
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const tokens = await this.generateTokens(user.id, user.role);
        await drizzle_1.db
            .update(user_schema_1.users)
            .set({
            refreshToken: await bcrypt.hash(tokens.refreshToken, 10),
        })
            .where((0, drizzle_orm_1.eq)(user_schema_1.users.id, user.id));
        return tokens;
    }
    async refreshTokens(userId, refreshToken) {
        const result = await drizzle_1.db
            .select()
            .from(user_schema_1.users)
            .where((0, drizzle_orm_1.eq)(user_schema_1.users.id, userId))
            .limit(1);
        const user = result[0];
        if (!user || !user.refreshToken) {
            throw new common_1.UnauthorizedException('Access denied');
        }
        const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Access denied');
        }
        const tokens = await this.generateTokens(user.id, user.role);
        await drizzle_1.db
            .update(user_schema_1.users)
            .set({
            refreshToken: await bcrypt.hash(tokens.refreshToken, 10),
        })
            .where((0, drizzle_orm_1.eq)(user_schema_1.users.id, user.id));
        return tokens;
    }
    async generateTokens(userId, role) {
        const payload = {
            sub: userId,
            role,
        };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m',
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
        });
        return { accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
