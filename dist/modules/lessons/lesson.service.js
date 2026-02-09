"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_1 = require("../../database/drizzle");
const lesson_schema_1 = require("../../database/schema/lesson.schema");
const drizzle_orm_1 = require("drizzle-orm");
let LessonService = class LessonService {
    async createLesson(input) {
        const [lesson] = await drizzle_1.db
            .insert(lesson_schema_1.lessons)
            .values({
            title: input.title,
            description: input.description,
            content: input.content ?? '',
            order: input.order,
            levelId: input.levelId,
            moduleId: input.moduleId ?? null,
        })
            .returning();
        return { ...lesson, vocabulary: [], examples: [] };
    }
    async updateLesson(input) {
        const updateData = {};
        if (input.title !== undefined)
            updateData.title = input.title;
        if (input.description !== undefined)
            updateData.description = input.description;
        if (input.content !== undefined)
            updateData.content = input.content;
        if (input.order !== undefined)
            updateData.order = input.order;
        if (input.levelId !== undefined)
            updateData.levelId = input.levelId;
        if (input.moduleId !== undefined)
            updateData.moduleId = input.moduleId;
        const [updatedLesson] = await drizzle_1.db
            .update(lesson_schema_1.lessons)
            .set(updateData)
            .where((0, drizzle_orm_1.eq)(lesson_schema_1.lessons.id, input.id))
            .returning();
        if (!updatedLesson) {
            throw new common_1.NotFoundException(`Lesson with id ${input.id} not found`);
        }
        return { ...updatedLesson, vocabulary: [], examples: [] };
    }
    async deleteLesson(id) {
        const [deleted] = await drizzle_1.db
            .delete(lesson_schema_1.lessons)
            .where((0, drizzle_orm_1.eq)(lesson_schema_1.lessons.id, id))
            .returning();
        if (!deleted) {
            throw new common_1.NotFoundException(`Lesson with id ${id} not found`);
        }
        return deleted;
    }
    async getLessons() {
        return drizzle_1.db.select().from(lesson_schema_1.lessons);
    }
    async getLesson(id) {
        const [lesson] = await drizzle_1.db
            .select()
            .from(lesson_schema_1.lessons)
            .where((0, drizzle_orm_1.eq)(lesson_schema_1.lessons.id, id));
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson with id ${id} not found`);
        }
        return lesson;
    }
    async getLessonsByLevel(levelId) {
        return drizzle_1.db
            .select()
            .from(lesson_schema_1.lessons)
            .where((0, drizzle_orm_1.eq)(lesson_schema_1.lessons.levelId, levelId));
    }
    async getLessonsByModule(moduleId) {
        return drizzle_1.db
            .select()
            .from(lesson_schema_1.lessons)
            .where((0, drizzle_orm_1.eq)(lesson_schema_1.lessons.moduleId, moduleId));
    }
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, common_1.Injectable)()
], LessonService);
