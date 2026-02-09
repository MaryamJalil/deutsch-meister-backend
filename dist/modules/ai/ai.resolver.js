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
const ai_content_generator_service_js_1 = require("./ai-content-generator.service.js");
const ai_tutor_service_js_1 = require("./ai-tutor.service.js");
const graphql_2 = require("@nestjs/graphql");
const vocabulary_model_js_1 = require("../vocabulary/vocabulary.model.js");
let GenerateVocabularyInputType = class GenerateVocabularyInputType {
};
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], GenerateVocabularyInputType.prototype, "topic", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], GenerateVocabularyInputType.prototype, "level", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", Number)
], GenerateVocabularyInputType.prototype, "count", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], GenerateVocabularyInputType.prototype, "targetLanguage", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], GenerateVocabularyInputType.prototype, "sourceLanguage", void 0);
GenerateVocabularyInputType = __decorate([
    (0, graphql_2.InputType)()
], GenerateVocabularyInputType);
let AIResolver = class AIResolver {
    constructor(generator, tutor) {
        this.generator = generator;
        this.tutor = tutor;
    }
    async generateVocabulary(input) {
        return this.generator.generateVocabulary(input);
    }
    async askTutor(message) {
        const response = await this.tutor.chat(message);
        return response.message;
    }
};
exports.AIResolver = AIResolver;
__decorate([
    (0, graphql_1.Mutation)(() => [vocabulary_model_js_1.Vocabulary]),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GenerateVocabularyInputType]),
    __metadata("design:returntype", Promise)
], AIResolver.prototype, "generateVocabulary", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Args)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AIResolver.prototype, "askTutor", null);
exports.AIResolver = AIResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [ai_content_generator_service_js_1.AIContentGeneratorService,
        ai_tutor_service_js_1.AITutorService])
], AIResolver);
