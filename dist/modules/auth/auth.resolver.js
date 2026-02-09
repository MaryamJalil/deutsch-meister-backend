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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = exports.AuthPayload = void 0;
const graphql_1 = require("@nestjs/graphql");
const register_input_1 = require("./dto/register.input");
const auth_service_1 = require("./auth.service");
const login_input_1 = require("./dto/login.input");
let AuthPayload = class AuthPayload {
};
exports.AuthPayload = AuthPayload;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AuthPayload.prototype, "accessToken", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AuthPayload.prototype, "refreshToken", void 0);
exports.AuthPayload = AuthPayload = __decorate([
    (0, graphql_1.ObjectType)()
], AuthPayload);
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    async register(input) {
        return this.authService.register(input.email, input.password, input.role);
    }
    async login(input) {
        return this.authService.login(input.email, input.password);
    }
    async refreshTokens(userId, refreshToken) {
        return this.authService.refreshTokens(userId, refreshToken);
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, graphql_1.Mutation)(() => AuthPayload),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_input_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
__decorate([
    (0, graphql_1.Mutation)(() => AuthPayload),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => AuthPayload),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "refreshTokens", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
