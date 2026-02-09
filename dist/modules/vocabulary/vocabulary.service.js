"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_1 = require("../../database/drizzle");
const drizzle_orm_1 = require("drizzle-orm");
const vocabulary_schema_1 = require("../../database/schema/vocabulary.schema");
let VocabularyService = class VocabularyService {
    async createVocabulary(input) {
        const [vocabulary] = await drizzle_1.db
            .insert(vocabulary_schema_1.vocabularies)
            .values({
            word: input.word,
            meaning: input.meaning,
            lessonId: input.lessonId,
        })
            .returning();
        return vocabulary;
    }
    async updateVocabulary(input) {
        const updateData = {};
        if (input.word !== undefined)
            updateData.word = input.word;
        if (input.meaning !== undefined)
            updateData.meaning = input.meaning;
        if (input.lessonId !== undefined)
            updateData.lessonId = input.lessonId;
        const [updatedVocabulary] = await drizzle_1.db
            .update(vocabulary_schema_1.vocabularies)
            .set(updateData)
            .where((0, drizzle_orm_1.eq)(vocabulary_schema_1.vocabularies.id, input.id))
            .returning();
        if (!updatedVocabulary) {
            throw new common_1.NotFoundException(`Vocabulary with id ${input.id} not found`);
        }
        return updatedVocabulary;
    }
    async deleteVocabulary(id) {
        const [deleted] = await drizzle_1.db
            .delete(vocabulary_schema_1.vocabularies)
            .where((0, drizzle_orm_1.eq)(vocabulary_schema_1.vocabularies.id, id))
            .returning();
        if (!deleted) {
            throw new common_1.NotFoundException(`Vocabulary with id ${id} not found`);
        }
        return deleted;
    }
    async getVocabularies() {
        return drizzle_1.db.select().from(vocabulary_schema_1.vocabularies);
    }
    async getVocabulary(id) {
        const [vocabulary] = await drizzle_1.db
            .select()
            .from(vocabulary_schema_1.vocabularies)
            .where((0, drizzle_orm_1.eq)(vocabulary_schema_1.vocabularies.id, id));
        if (!vocabulary) {
            throw new common_1.NotFoundException(`Vocabulary with id ${id} not found`);
        }
        return vocabulary;
    }
    async getVocabularyByLesson(lessonId) {
        return drizzle_1.db
            .select()
            .from(vocabulary_schema_1.vocabularies)
            .where((0, drizzle_orm_1.eq)(vocabulary_schema_1.vocabularies.lessonId, lessonId));
    }
    async searchVocabulary(searchTerm) {
        return drizzle_1.db
            .select()
            .from(vocabulary_schema_1.vocabularies)
            .where((0, drizzle_orm_1.sql) `LOWER(${vocabulary_schema_1.vocabularies.word}) LIKE LOWER(${'%' + searchTerm + '%'})`);
    }
};
exports.VocabularyService = VocabularyService;
exports.VocabularyService = VocabularyService = __decorate([
    (0, common_1.Injectable)()
], VocabularyService);
