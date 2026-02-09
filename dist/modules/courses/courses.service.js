"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const course_schema_1 = require("../../database/schema/course.schema");
const drizzle_1 = require("../../database/drizzle");
const drizzle_orm_1 = require("drizzle-orm");
let CourseService = class CourseService {
    async createCourse(input) {
        const [course] = await drizzle_1.db
            .insert(course_schema_1.courses)
            .values({
            title: input.title,
            language: input.language,
        })
            .returning();
        return course;
    }
    async updateCourse(input) {
        const updateData = {};
        if (input.title !== undefined)
            updateData.title = input.title;
        if (input.language !== undefined)
            updateData.language = input.language;
        const [updatedCourse] = await drizzle_1.db
            .update(course_schema_1.courses)
            .set(updateData)
            .where((0, drizzle_orm_1.eq)(course_schema_1.courses.id, input.id))
            .returning();
        if (!updatedCourse) {
            throw new common_1.NotFoundException(`Course with id ${input.id} not found`);
        }
        return updatedCourse;
    }
    async deleteCourse(id) {
        const [deleted] = await drizzle_1.db
            .update(course_schema_1.courses)
            .set({ deletedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(course_schema_1.courses.id, id))
            .returning();
        if (!deleted) {
            throw new common_1.NotFoundException(`Course with id ${id} not found`);
        }
        return deleted;
    }
    async getCourses() {
        return drizzle_1.db.select().from(course_schema_1.courses).where((0, drizzle_orm_1.isNull)(course_schema_1.courses.deletedAt));
    }
    async getCourse(id) {
        const [course] = await drizzle_1.db
            .select()
            .from(course_schema_1.courses)
            .where((0, drizzle_orm_1.eq)(course_schema_1.courses.id, id));
        if (!course) {
            throw new common_1.NotFoundException(`Course with id ${id} not found`);
        }
        return course;
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)()
], CourseService);
