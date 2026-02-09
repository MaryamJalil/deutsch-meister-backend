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
exports.VocabularyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const vocabulary_model_1 = require("./vocabulary.model");
const vocabulary_service_1 = require("./vocabulary.service");
const vocabulary_input_1 = require("../auth/dto/vocabulary.input");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let VocabularyResolver = class VocabularyResolver {
    constructor(vocabularyService) {
        this.vocabularyService = vocabularyService;
    }
    async createVocabulary(input) {
        return this.vocabularyService.createVocabulary(input);
    }
    async updateVocabulary(input) {
        return this.vocabularyService.updateVocabulary(input);
    }
    async deleteVocabulary(id) {
        return this.vocabularyService.deleteVocabulary(id);
    }
    async getVocabularies() {
        return this.vocabularyService.getVocabularies();
    }
    async getVocabulary(id) {
        return this.vocabularyService.getVocabulary(id);
    }
    async getVocabularyByLesson(lessonId) {
        return this.vocabularyService.getVocabularyByLesson(lessonId);
    }
    async searchVocabulary(query) {
        return this.vocabularyService.searchVocabulary(query);
    }
};
exports.VocabularyResolver = VocabularyResolver;
__decorate([
    (0, graphql_1.Mutation)(() => vocabulary_model_1.Vocabulary),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vocabulary_input_1.CreateVocabularyInput]),
    __metadata("design:returntype", Promise)
], VocabularyResolver.prototype, "createVocabulary", null);
__decorate([
    (0, graphql_1.Mutation)(() => vocabulary_model_1.Vocabulary),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vocabulary_input_1.UpdateVocabularyInput]),
    __metadata("design:returntype", Promise)
], VocabularyResolver.prototype, "updateVocabulary", null);
__decorate([
    (0, graphql_1.Mutation)(() => vocabulary_model_1.Vocabulary),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VocabularyResolver.prototype, "deleteVocabulary", null);
__decorate([
    (0, graphql_1.Query)(() => [vocabulary_model_1.Vocabulary], { name: 'vocabularies' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VocabularyResolver.prototype, "getVocabularies", null);
__decorate([
    (0, graphql_1.Query)(() => vocabulary_model_1.Vocabulary, { name: 'vocabulary', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VocabularyResolver.prototype, "getVocabulary", null);
__decorate([
    (0, graphql_1.Query)(() => [vocabulary_model_1.Vocabulary], { name: 'vocabularyByLesson' }),
    __param(0, (0, graphql_1.Args)('lessonId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VocabularyResolver.prototype, "getVocabularyByLesson", null);
__decorate([
    (0, graphql_1.Query)(() => [vocabulary_model_1.Vocabulary], { name: 'searchVocabulary' }),
    __param(0, (0, graphql_1.Args)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VocabularyResolver.prototype, "searchVocabulary", null);
exports.VocabularyResolver = VocabularyResolver = __decorate([
    (0, graphql_1.Resolver)(() => vocabulary_model_1.Vocabulary),
    __metadata("design:paramtypes", [vocabulary_service_1.VocabularyService])
], VocabularyResolver);
