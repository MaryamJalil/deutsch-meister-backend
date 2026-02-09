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
exports.LessonResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const lesson_model_1 = require("./lesson.model");
const lesson_input_1 = require("../auth/dto/lesson.input");
const lesson_service_1 = require("./lesson.service");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let LessonResolver = class LessonResolver {
    constructor(lessonService) {
        this.lessonService = lessonService;
    }
    async createLesson(input) {
        return this.lessonService.createLesson(input);
    }
    async updateLesson(input) {
        return this.lessonService.updateLesson(input);
    }
    async deleteLesson(id) {
        return this.lessonService.deleteLesson(id);
    }
    async getLessons() {
        return this.lessonService.getLessons();
    }
    async getLesson(id) {
        return this.lessonService.getLesson(id);
    }
    async getLessonsByLevel(levelId) {
        return this.lessonService.getLessonsByLevel(levelId);
    }
    async getLessonsByModule(moduleId) {
        return this.lessonService.getLessonsByModule(moduleId);
    }
};
exports.LessonResolver = LessonResolver;
__decorate([
    (0, graphql_1.Mutation)(() => lesson_model_1.Lesson),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lesson_input_1.CreateLessonInput]),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "createLesson", null);
__decorate([
    (0, graphql_1.Mutation)(() => lesson_model_1.Lesson),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lesson_input_1.UpdateLessonInput]),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "updateLesson", null);
__decorate([
    (0, graphql_1.Mutation)(() => lesson_model_1.Lesson),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "deleteLesson", null);
__decorate([
    (0, graphql_1.Query)(() => [lesson_model_1.Lesson], { name: 'lessons' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "getLessons", null);
__decorate([
    (0, graphql_1.Query)(() => lesson_model_1.Lesson, { name: 'lesson', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "getLesson", null);
__decorate([
    (0, graphql_1.Query)(() => [lesson_model_1.Lesson], { name: 'lessonsByLevel' }),
    __param(0, (0, graphql_1.Args)('levelId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "getLessonsByLevel", null);
__decorate([
    (0, graphql_1.Query)(() => [lesson_model_1.Lesson], { name: 'lessonsByModule' }),
    __param(0, (0, graphql_1.Args)('moduleId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "getLessonsByModule", null);
exports.LessonResolver = LessonResolver = __decorate([
    (0, graphql_1.Resolver)(() => lesson_model_1.Lesson),
    __metadata("design:paramtypes", [lesson_service_1.LessonService])
], LessonResolver);
