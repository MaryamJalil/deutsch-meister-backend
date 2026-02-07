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
            moduleId: input.moduleId ?? 0,
        })
            .returning();
        console.log(lesson);
        return { ...lesson, vocabulary: [], examples: [] };
    }
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, common_1.Injectable)()
], LessonService);
