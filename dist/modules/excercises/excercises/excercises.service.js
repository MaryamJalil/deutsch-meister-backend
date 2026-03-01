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
var ExcercisesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcercisesService = void 0;
const common_1 = require("@nestjs/common");
const aiContentGenerator_service_1 = require("../../ai/aiContentGenerator.service");
const cache_service_1 = require("../../cache/cache.service");
const lesson_schema_1 = require("../../../database/schema/lesson.schema");
const drizzle_1 = require("../../../database/drizzle");
const drizzle_orm_1 = require("drizzle-orm");
const excerciseType_enum_1 = require("../../../common/enums/excerciseType.enum");
const excercises_schems_1 = require("../../../database/schema/excercises.schems");
let ExcercisesService = ExcercisesService_1 = class ExcercisesService {
    constructor(aiGenerator, chache) {
        this.aiGenerator = aiGenerator;
        this.chache = chache;
        this.logger = new common_1.Logger(ExcercisesService_1.name);
    }
    async generateExercises(input) {
        const { lessonId, type, count = 5 } = input;
        console.log(lessonId);
        const [lesson] = await drizzle_1.db
            .select()
            .from(lesson_schema_1.lessons)
            .where((0, drizzle_orm_1.eq)(lesson_schema_1.lessons.id, lessonId));
        if (!lesson)
            throw new common_1.NotFoundException(`Lesson ${lessonId} not found`);
        const content = lesson.content ?? lesson.title;
        const level = 'A1';
        const typesToGenerate = type
            ? [type]
            : [
                excerciseType_enum_1.ExcerciseType.FILL_IN_THE_BLANK,
                excerciseType_enum_1.ExcerciseType.LISTENING_COMPREHENSION,
                excerciseType_enum_1.ExcerciseType.MULTIPLE_CHOICE,
                excerciseType_enum_1.ExcerciseType.SENTENCE_ORDERING,
            ];
        const created = [];
        for (const excerciseType of typesToGenerate) {
            const rawItems = await this.generateByType(excerciseType, content, level, count);
            for (const item of rawItems) {
                const [ex] = await drizzle_1.db
                    .insert(excercises_schems_1.exercises)
                    .values({
                    lessonId,
                    type: excerciseType,
                    question: item.question,
                    targetAnswer: item.targetAnswer,
                    explanation: item.explanation ?? null,
                    metadata: item.metadata ?? null,
                    generatedByAi: true,
                })
                    .returning();
                created.push(ex);
            }
        }
        await this.chache.delete(`excercises: ${lessonId}`);
        return created;
    }
    async generateByType(type, content, level, count) {
        switch (type) {
            case excerciseType_enum_1.ExcerciseType.MULTIPLE_CHOICE: {
                const items = await this.aiGenerator.generateMultipleChoiceExercises(content, level, count);
                return items.map((i) => ({
                    question: i.question,
                    targetAnswer: i.options[i.correctIndex] ?? '',
                    explanation: i.explanation,
                    metadata: { options: i.options, correctIndex: i.correctIndex },
                }));
            }
            case excerciseType_enum_1.ExcerciseType.FILL_IN_THE_BLANK: {
                const items = await this.aiGenerator.generateFillInBlankExercises(content, level, count);
                return items.map((i) => ({
                    question: i.sentence_with_blank,
                    targetAnswer: i.answer,
                    metadata: { hint: i.hint },
                }));
            }
            case excerciseType_enum_1.ExcerciseType.SENTENCE_ORDERING: {
                const items = await this.aiGenerator.generateSentenceOrderingExercises(content, level, count);
                return items.map((i) => ({
                    question: i.prompt,
                    targetAnswer: i.correctOrder.map((idx) => i.parts[idx]).join(' '),
                    metadata: { parts: i.parts, correctOrder: i.correctOrder },
                }));
            }
            case excerciseType_enum_1.ExcerciseType.LISTENING_COMPREHENSION: {
                const items = await this.aiGenerator.generateListeningExercises(content, level, count);
                return items.map((i) => ({
                    question: i.question,
                    targetAnswer: i.answer,
                    metadata: { textToRead: i.text_to_read, hint: i.hint },
                }));
            }
        }
    }
};
exports.ExcercisesService = ExcercisesService;
exports.ExcercisesService = ExcercisesService = ExcercisesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [aiContentGenerator_service_1.AIContentGeneratorService,
        cache_service_1.CacheService])
], ExcercisesService);
