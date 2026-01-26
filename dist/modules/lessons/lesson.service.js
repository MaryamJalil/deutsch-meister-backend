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
    async createLessonAtPosition(title, order, levelId, description, content) {
        console.log('CREATE LESSON INPUT:', title, order, levelId, description, content);
        return drizzle_js_1.db.transaction(async (tx) => {
            // 1️⃣ Shift existing lessons down
            await tx
                .update(lesson_schema_js_1.lessons)
                .set({
                order: (0, index_js_1.sql) `${lesson_schema_js_1.lessons.order} + 1`,
            })
                .where((0, index_js_1.and)((0, index_js_1.eq)(lesson_schema_js_1.lessons.levelId, levelId), (0, index_js_1.gte)(lesson_schema_js_1.lessons.order, order)));
            // 2️⃣ Insert the new lesson
            const [lesson] = await tx
                .insert(lesson_schema_js_1.lessons)
                .values({
                title,
                content: content ?? '',
                order,
                levelId,
                description,
            })
                .returning();
            return lesson;
        });
    }
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, common_1.Injectable)()
], LessonService);
