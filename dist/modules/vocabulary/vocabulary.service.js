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
const drizzle_js_1 = require("../../database/drizzle.js");
const index_js_1 = require("../../../node_modules/drizzle-orm/index.js");
const vocabulary_schema_js_1 = require("../../database/schema/vocabulary.schema.js");
let VocabularyService = class VocabularyService {
    async createVocabulary(input) {
        const [vocabulary] = await drizzle_js_1.db
            .insert(vocabulary_schema_js_1.vocabularies)
            .values({
            word: input.word,
            meaning: input.meaning,
            lessonId: input.lessonId,
        })
            .returning();
        return vocabulary;
    }
    async updateVocabulary(input) {
        const { id, ...data } = input;
        const [updatedVocabulary] = await drizzle_js_1.db
            .update(vocabulary_schema_js_1.vocabularies)
            .set(data)
            .where((0, index_js_1.eq)(vocabulary_schema_js_1.vocabularies.id, id))
            .returning();
        if (!updatedVocabulary) {
            throw new Error(`Vocabulary with id ${id} not found`);
        }
        return updatedVocabulary;
    }
    async getVocabularies() {
        const allVocabularies = await drizzle_js_1.db.select().from(vocabulary_schema_js_1.vocabularies);
        if (!vocabulary_schema_js_1.vocabularies) {
            throw new common_1.NotFoundException('Vocabularies not found');
        }
        return allVocabularies;
    }
    async getVocabulary(id) {
        const vocabulary = await drizzle_js_1.db
            .select()
            .from(vocabulary_schema_js_1.vocabularies)
            .where((0, index_js_1.eq)(vocabulary_schema_js_1.vocabularies.id, id));
        if (!vocabulary) {
            throw new common_1.NotFoundException('Vocabulary not found');
        }
        return vocabulary[0];
    }
    async searchVocabulary(searchTerm) {
        const results = await drizzle_js_1.db
            .select()
            .from(vocabulary_schema_js_1.vocabularies)
            .where((0, index_js_1.sql) `LOWER (${vocabulary_schema_js_1.vocabularies.word}) LIKE LOWER(${'%' + searchTerm + '%'})`);
    }
};
exports.VocabularyService = VocabularyService;
exports.VocabularyService = VocabularyService = __decorate([
    (0, common_1.Injectable)()
], VocabularyService);
