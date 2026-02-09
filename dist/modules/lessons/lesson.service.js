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
const drizzle_js_1 = require("../../database/drizzle.js");
const lesson_schema_js_1 = require("../../database/schema/lesson.schema.js");
const index_js_1 = require("../../../node_modules/drizzle-orm/index.js");
let LessonService = class LessonService {
    async createLesson(input) {
        const [lesson] = await drizzle_js_1.db
            .insert(lesson_schema_js_1.lessons)
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
        const [updatedLesson] = await drizzle_js_1.db
            .update(lesson_schema_js_1.lessons)
            .set({
            title: input.title,
            description: input.description,
            content: input.content,
            order: input.order,
            levelId: input.levelId,
            moduleId: input.moduleId,
        })
            .where((0, index_js_1.eq)(lesson_schema_js_1.lessons.id, input.id))
            .returning();
        if (!updatedLesson) {
            throw new common_1.NotFoundException('Lesson Not Found');
        }
        return { ...updatedLesson, vocabulary: [], examples: [] };
    }
    async getLessons() {
        const allLesson = await drizzle_js_1.db.select().from(lesson_schema_js_1.lessons);
        if (!allLesson) {
            throw new common_1.NotFoundException('Lessons not found');
        }
        return allLesson;
    }
    async getLesson(id) {
        const lesson = await drizzle_js_1.db.select().from(lesson_schema_js_1.lessons).where((0, index_js_1.eq)(lesson_schema_js_1.lessons.id, id));
        if (!lesson) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        return lesson[0];
    }
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, common_1.Injectable)()
], LessonService);
