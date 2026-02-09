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
exports.LevelResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const level_model_1 = require("./level.model");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const level_service_1 = require("./level.service");
const levels_input_1 = require("../auth/dto/levels.input");
let LevelResolver = class LevelResolver {
    constructor(levelService) {
        this.levelService = levelService;
    }
    createLevel(input) {
        return this.levelService.createLevel(input);
    }
    updateLevel(input) {
        return this.levelService.updateLevel(input);
    }
    deleteLevel(id) {
        return this.levelService.deleteLevel(id);
    }
    async getLevels() {
        return this.levelService.getLevels();
    }
    async getLevel(id) {
        return this.levelService.getLevel(id);
    }
    async getLevelsByCourse(courseId) {
        return this.levelService.getLevelsByCourse(courseId);
    }
};
exports.LevelResolver = LevelResolver;
__decorate([
    (0, graphql_1.Mutation)(() => level_model_1.Level),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [levels_input_1.CreateLevelInput]),
    __metadata("design:returntype", void 0)
], LevelResolver.prototype, "createLevel", null);
__decorate([
    (0, graphql_1.Mutation)(() => level_model_1.Level),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [levels_input_1.UpdateLevelInput]),
    __metadata("design:returntype", void 0)
], LevelResolver.prototype, "updateLevel", null);
__decorate([
    (0, graphql_1.Mutation)(() => level_model_1.Level),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LevelResolver.prototype, "deleteLevel", null);
__decorate([
    (0, graphql_1.Query)(() => [level_model_1.Level], { name: 'levels' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LevelResolver.prototype, "getLevels", null);
__decorate([
    (0, graphql_1.Query)(() => level_model_1.Level, { name: 'level', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LevelResolver.prototype, "getLevel", null);
__decorate([
    (0, graphql_1.Query)(() => [level_model_1.Level], { name: 'levelsByCourse' }),
    __param(0, (0, graphql_1.Args)('courseId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LevelResolver.prototype, "getLevelsByCourse", null);
exports.LevelResolver = LevelResolver = __decorate([
    (0, graphql_1.Resolver)(() => level_model_1.Level),
    __metadata("design:paramtypes", [level_service_1.LevelService])
], LevelResolver);
