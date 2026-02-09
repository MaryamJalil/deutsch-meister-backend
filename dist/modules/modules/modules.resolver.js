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
exports.ModulesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const modules_service_1 = require("./modules.service");
const module_model_1 = require("./module.model");
const modules_input_1 = require("../auth/dto/modules.input");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let ModulesResolver = class ModulesResolver {
    constructor(moduleService) {
        this.moduleService = moduleService;
    }
    async createModule(input) {
        return this.moduleService.createModule(input);
    }
    async updateModule(input) {
        return this.moduleService.updateModule(input);
    }
    async deleteModule(id) {
        return this.moduleService.deleteModule(id);
    }
    async getModules() {
        return this.moduleService.getModules();
    }
    async getModule(id) {
        return this.moduleService.getModule(id);
    }
    async getModulesByLevel(levelId) {
        return this.moduleService.getModulesByLevel(levelId);
    }
};
exports.ModulesResolver = ModulesResolver;
__decorate([
    (0, graphql_1.Mutation)(() => module_model_1.Module),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [modules_input_1.CreateModuleInput]),
    __metadata("design:returntype", Promise)
], ModulesResolver.prototype, "createModule", null);
__decorate([
    (0, graphql_1.Mutation)(() => module_model_1.Module),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [modules_input_1.UpdateModuleInput]),
    __metadata("design:returntype", Promise)
], ModulesResolver.prototype, "updateModule", null);
__decorate([
    (0, graphql_1.Mutation)(() => module_model_1.Module),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ModulesResolver.prototype, "deleteModule", null);
__decorate([
    (0, graphql_1.Query)(() => [module_model_1.Module], { name: 'modules' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ModulesResolver.prototype, "getModules", null);
__decorate([
    (0, graphql_1.Query)(() => module_model_1.Module, { name: 'module', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ModulesResolver.prototype, "getModule", null);
__decorate([
    (0, graphql_1.Query)(() => [module_model_1.Module], { name: 'modulesByLevel' }),
    __param(0, (0, graphql_1.Args)('levelId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ModulesResolver.prototype, "getModulesByLevel", null);
exports.ModulesResolver = ModulesResolver = __decorate([
    (0, graphql_1.Resolver)(() => module_model_1.Module),
    __metadata("design:paramtypes", [modules_service_1.ModuleService])
], ModulesResolver);
