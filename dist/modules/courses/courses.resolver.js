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
exports.CoursesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const course_model_1 = require("./course.model");
const courses_service_1 = require("./courses.service");
const course_input_1 = require("../auth/dto/course.input");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let CoursesResolver = class CoursesResolver {
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    async createCourse(input) {
        return this.coursesService.createCourse(input);
    }
    async updateCourse(input) {
        return this.coursesService.updateCourse(input);
    }
    async deleteCourse(id) {
        return this.coursesService.deleteCourse(id);
    }
    async getCourses() {
        return this.coursesService.getCourses();
    }
    async getCourse(id) {
        return this.coursesService.getCourse(id);
    }
};
exports.CoursesResolver = CoursesResolver;
__decorate([
    (0, graphql_1.Mutation)(() => course_model_1.Course),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_input_1.CreateCourseInput]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "createCourse", null);
__decorate([
    (0, graphql_1.Mutation)(() => course_model_1.Course),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_input_1.UpdateCourseInput]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "updateCourse", null);
__decorate([
    (0, graphql_1.Mutation)(() => course_model_1.Course),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "deleteCourse", null);
__decorate([
    (0, graphql_1.Query)(() => [course_model_1.Course], { name: 'courses' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "getCourses", null);
__decorate([
    (0, graphql_1.Query)(() => course_model_1.Course, { name: 'course', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "getCourse", null);
exports.CoursesResolver = CoursesResolver = __decorate([
    (0, graphql_1.Resolver)(() => course_model_1.Course),
    __metadata("design:paramtypes", [courses_service_1.CourseService])
], CoursesResolver);
