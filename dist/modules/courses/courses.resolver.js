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
const index_js_1 = require("@nestjs/graphql/dist/index.js");
const course_model_js_1 = require("./course.model.js");
const courses_service_js_1 = require("./courses.service.js");
const course_input_js_1 = require("../auth/dto/course.input.js");
let CoursesResolver = class CoursesResolver {
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    // @UseGuards(GqlAuthGuard, RolesGuard)
    // @Roles('ADMIN')
    async createCourse(input) {
        const course = await this.coursesService.createCourse(input);
        return course;
    }
    // @UseGuards(GqlAuthGuard, RolesGuard)
    // @Roles('ADMIN')
    updateCourse(input) {
        return this.coursesService.updateCourse(input);
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
    (0, index_js_1.Mutation)(() => course_model_js_1.Course)
    // @UseGuards(GqlAuthGuard, RolesGuard)
    // @Roles('ADMIN')
    ,
    __param(0, (0, index_js_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_input_js_1.CreateCourseInput]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "createCourse", null);
__decorate([
    (0, index_js_1.Mutation)(() => course_model_js_1.Course)
    // @UseGuards(GqlAuthGuard, RolesGuard)
    // @Roles('ADMIN')
    ,
    __param(0, (0, index_js_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_input_js_1.UpdateCourseInput]),
    __metadata("design:returntype", void 0)
], CoursesResolver.prototype, "updateCourse", null);
__decorate([
    (0, index_js_1.Query)(() => [course_model_js_1.Course], { name: 'courses' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "getCourses", null);
__decorate([
    (0, index_js_1.Query)(() => course_model_js_1.Course, { name: 'course' }),
    __param(0, (0, index_js_1.Args)('id', { type: () => index_js_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "getCourse", null);
exports.CoursesResolver = CoursesResolver = __decorate([
    (0, index_js_1.Resolver)(),
    __metadata("design:paramtypes", [courses_service_js_1.CourseService])
], CoursesResolver);
