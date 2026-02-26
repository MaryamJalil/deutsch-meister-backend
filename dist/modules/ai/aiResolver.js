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
exports.AIResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const aiContentGenerator_service_1 = require("./aiContentGenerator.service");
const aiTutor_service_1 = require("./aiTutor.service");
const ai_input_1 = require("../auth/dto/ai.input");
let GeneratedVocabularyItem = class GeneratedVocabularyItem {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GeneratedVocabularyItem.prototype, "word", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GeneratedVocabularyItem.prototype, "meaning", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GeneratedVocabularyItem.prototype, "partOfSpeech", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GeneratedVocabularyItem.prototype, "example", void 0);
GeneratedVocabularyItem = __decorate([
    (0, graphql_1.ObjectType)()
], GeneratedVocabularyItem);
let GeneratedExampleSentence = class GeneratedExampleSentence {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GeneratedExampleSentence.prototype, "sentence", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GeneratedExampleSentence.prototype, "translation", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GeneratedExampleSentence.prototype, "context", void 0);
GeneratedExampleSentence = __decorate([
    (0, graphql_1.ObjectType)()
], GeneratedExampleSentence);
let TutorResponse = class TutorResponse {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TutorResponse.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], TutorResponse.prototype, "relatedLessons", void 0);
TutorResponse = __decorate([
    (0, graphql_1.ObjectType)()
], TutorResponse);
let TranslationResponse = class TranslationResponse {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TranslationResponse.prototype, "translation", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TranslationResponse.prototype, "explanation", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], TranslationResponse.prototype, "breakdown", void 0);
TranslationResponse = __decorate([
    (0, graphql_1.ObjectType)()
], TranslationResponse);
let LessonSection = class LessonSection {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LessonSection.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LessonSection.prototype, "content", void 0);
LessonSection = __decorate([
    (0, graphql_1.ObjectType)()
], LessonSection);
let GeneratedLesson = class GeneratedLesson {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GeneratedLesson.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], GeneratedLesson.prototype, "objectives", void 0);
__decorate([
    (0, graphql_1.Field)(() => [LessonSection]),
    __metadata("design:type", Array)
], GeneratedLesson.prototype, "sections", void 0);
GeneratedLesson = __decorate([
    (0, graphql_1.ObjectType)()
], GeneratedLesson);
let GenerateLessonInput = class GenerateLessonInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GenerateLessonInput.prototype, "topic", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GenerateLessonInput.prototype, "level", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], GenerateLessonInput.prototype, "sections", void 0);
GenerateLessonInput = __decorate([
    (0, graphql_1.InputType)()
], GenerateLessonInput);
let GeneratedQuizQuestion = class GeneratedQuizQuestion {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GeneratedQuizQuestion.prototype, "question", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], GeneratedQuizQuestion.prototype, "options", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GeneratedQuizQuestion.prototype, "answer", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GeneratedQuizQuestion.prototype, "explanation", void 0);
GeneratedQuizQuestion = __decorate([
    (0, graphql_1.ObjectType)()
], GeneratedQuizQuestion);
let GenerateQuizInput = class GenerateQuizInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GenerateQuizInput.prototype, "text", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], GenerateQuizInput.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GenerateQuizInput.prototype, "level", void 0);
GenerateQuizInput = __decorate([
    (0, graphql_1.InputType)()
], GenerateQuizInput);
let GenerateExamplesInput = class GenerateExamplesInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GenerateExamplesInput.prototype, "word", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GenerateExamplesInput.prototype, "level", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], GenerateExamplesInput.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GenerateExamplesInput.prototype, "targetLanguage", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GenerateExamplesInput.prototype, "sourceLanguage", void 0);
GenerateExamplesInput = __decorate([
    (0, graphql_1.InputType)()
], GenerateExamplesInput);
let AIResolver = class AIResolver {
    constructor(generator, tutor) {
        this.generator = generator;
        this.tutor = tutor;
    }
    async generateVocabulary(input) {
        console.log(input, 'jjj');
        return this.generator.generateVocabulary(input);
    }
    async generateExamples(input) {
        return this.generator.generateExamples(input);
    }
    async generateLessonOutline(input) {
        return this.generator.generateLessonOutline(input);
    }
    async generateQuiz(input) {
        return this.generator.generateQuiz(input);
    }
    async askTutor(message) {
        return this.tutor.chat(message);
    }
    async explainGrammar(concept, level, targetLanguage, sourceLanguage) {
        return this.generator.explainGrammar(concept, level, targetLanguage, sourceLanguage);
    }
    async translateWithExplanation(text, sourceLanguage, targetLanguage, level) {
        return this.generator.translateWithExplanation(text, sourceLanguage, targetLanguage, level);
    }
    async summarizeText(text, targetLanguage) {
        return this.generator.summarizeText(text, targetLanguage);
    }
    async paraphraseText(text, level) {
        return this.generator.paraphraseText(text, level);
    }
};
exports.AIResolver = AIResolver;
__decorate([
    (0, graphql_1.Mutation)(() => [GeneratedVocabularyItem]),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_input_1.GenerateVocabularyInput]),
    __metadata("design:returntype", Promise)
], AIResolver.prototype, "generateVocabulary", null);
__decorate([
    (0, graphql_1.Mutation)(() => [GeneratedExampleSentence]),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GenerateExamplesInput]),
    __metadata("design:returntype", Promise)
], AIResolver.prototype, "generateExamples", null);
__decorate([
    (0, graphql_1.Mutation)(() => GeneratedLesson),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GenerateLessonInput]),
    __metadata("design:returntype", Promise)
], AIResolver.prototype, "generateLessonOutline", null);
__decorate([
    (0, graphql_1.Mutation)(() => [GeneratedQuizQuestion]),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GenerateQuizInput]),
    __metadata("design:returntype", Promise)
], AIResolver.prototype, "generateQuiz", null);
__decorate([
    (0, graphql_1.Query)(() => TutorResponse),
    __param(0, (0, graphql_1.Args)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AIResolver.prototype, "askTutor", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Args)('concept')),
    __param(1, (0, graphql_1.Args)('level')),
    __param(2, (0, graphql_1.Args)('targetLanguage', { defaultValue: 'German' })),
    __param(3, (0, graphql_1.Args)('sourceLanguage', { defaultValue: 'English' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AIResolver.prototype, "explainGrammar", null);
__decorate([
    (0, graphql_1.Query)(() => TranslationResponse),
    __param(0, (0, graphql_1.Args)('text')),
    __param(1, (0, graphql_1.Args)('sourceLanguage')),
    __param(2, (0, graphql_1.Args)('targetLanguage')),
    __param(3, (0, graphql_1.Args)('level', { defaultValue: 'A1' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AIResolver.prototype, "translateWithExplanation", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Args)('text')),
    __param(1, (0, graphql_1.Args)('targetLanguage', { defaultValue: 'German' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AIResolver.prototype, "summarizeText", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('text')),
    __param(1, (0, graphql_1.Args)('level', { defaultValue: 'A2' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AIResolver.prototype, "paraphraseText", null);
exports.AIResolver = AIResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [aiContentGenerator_service_1.AIContentGeneratorService,
        aiTutor_service_1.AITutorService])
], AIResolver);
