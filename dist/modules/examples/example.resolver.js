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
exports.ExampleResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const example_service_1 = require("./example.service");
const example_model_1 = require("./example.model");
const example_input_1 = require("../auth/dto/example.input");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let ExampleResolver = class ExampleResolver {
    constructor(exampleService) {
        this.exampleService = exampleService;
    }
    async createExample(input) {
        return this.exampleService.createExample(input);
    }
    async updateExample(input) {
        return this.exampleService.updateExample(input);
    }
    async deleteExample(id) {
        return this.exampleService.deleteExample(id);
    }
    async getExamples() {
        return this.exampleService.getExamples();
    }
    async getExample(id) {
        return this.exampleService.getExample(id);
    }
    async getExamplesByLesson(lessonId) {
        return this.exampleService.getExamplesByLesson(lessonId);
    }
};
exports.ExampleResolver = ExampleResolver;
__decorate([
    (0, graphql_1.Mutation)(() => example_model_1.Example),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [example_input_1.CreateExampleInput]),
    __metadata("design:returntype", Promise)
], ExampleResolver.prototype, "createExample", null);
__decorate([
    (0, graphql_1.Mutation)(() => example_model_1.Example),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [example_input_1.UpdateExampleInput]),
    __metadata("design:returntype", Promise)
], ExampleResolver.prototype, "updateExample", null);
__decorate([
    (0, graphql_1.Mutation)(() => example_model_1.Example),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExampleResolver.prototype, "deleteExample", null);
__decorate([
    (0, graphql_1.Query)(() => [example_model_1.Example], { name: 'examples' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleResolver.prototype, "getExamples", null);
__decorate([
    (0, graphql_1.Query)(() => example_model_1.Example, { name: 'example', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExampleResolver.prototype, "getExample", null);
__decorate([
    (0, graphql_1.Query)(() => [example_model_1.Example], { name: 'examplesByLesson' }),
    __param(0, (0, graphql_1.Args)('lessonId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExampleResolver.prototype, "getExamplesByLesson", null);
exports.ExampleResolver = ExampleResolver = __decorate([
    (0, graphql_1.Resolver)(() => example_model_1.Example),
    __metadata("design:paramtypes", [example_service_1.ExampleService])
], ExampleResolver);
