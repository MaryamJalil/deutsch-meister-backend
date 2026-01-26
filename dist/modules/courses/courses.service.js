"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const index_js_1 = require("@nestjs/common/index.js");
const course_schema_js_1 = require("../../database/schema/course.schema.js");
const drizzle_js_1 = require("../../database/drizzle.js");
const index_js_2 = require("../../../node_modules/drizzle-orm/index.js");
let CourseService = class CourseService {
    async createCourse(title, language) {
        const [course] = await drizzle_js_1.db
            .insert(course_schema_js_1.courses)
            .values({
            title,
            language,
        })
            .returning();
        return course;
    }
    async updateCourse(input) {
        const [updatedCourse] = await drizzle_js_1.db
            .update(course_schema_js_1.courses)
            .set({
            title: input.title,
            language: input.language,
        })
            .where((0, index_js_2.eq)(course_schema_js_1.courses.id, input.id))
            .returning();
        if (!updatedCourse) {
            throw new index_js_1.NotFoundException('Course not found');
        }
        return updatedCourse;
    }
    async getCourses() {
        const course = await drizzle_js_1.db.select().from(course_schema_js_1.courses);
        if (!course) {
            throw new index_js_1.NotFoundException('Course not found');
        }
        return course;
    }
    async getCourse(id) {
        const course = await drizzle_js_1.db.select().from(course_schema_js_1.courses).where((0, index_js_2.eq)(course_schema_js_1.courses.id, id));
        if (!course) {
            throw new index_js_1.NotFoundException('Course not found');
        }
        return course;
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, index_js_1.Injectable)()
], CourseService);
