"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIModule = void 0;
const common_1 = require("@nestjs/common");
const aiContentGenerator_service_1 = require("./aiContentGenerator.service");
const aiTutor_service_1 = require("./aiTutor.service");
const vectorSearch_service_1 = require("./vectorSearch.service");
const aiResolver_1 = require("./aiResolver");
const flashcards_service_1 = require("./flashcards.service");
const flashcards_resolver_1 = require("./flashcards.resolver");
const pronunciation_service_1 = require("./pronunciation.service");
const pronunciation_resolver_1 = require("./pronunciation.resolver");
const spacedRepetition_service_1 = require("./spacedRepetition.service");
let AIModule = class AIModule {
};
exports.AIModule = AIModule;
exports.AIModule = AIModule = __decorate([
    (0, common_1.Module)({
        providers: [
            aiContentGenerator_service_1.AIContentGeneratorService,
            aiTutor_service_1.AITutorService,
            vectorSearch_service_1.VectorSearchService,
            aiResolver_1.AIResolver,
            flashcards_service_1.FlashcardsService,
            flashcards_resolver_1.FlashcardsResolver,
            pronunciation_service_1.PronunciationService,
            pronunciation_resolver_1.PronunciationResolver,
            spacedRepetition_service_1.SpacedRepetitionService,
        ],
        exports: [
            aiContentGenerator_service_1.AIContentGeneratorService,
            aiTutor_service_1.AITutorService,
            vectorSearch_service_1.VectorSearchService,
            flashcards_service_1.FlashcardsService,
            pronunciation_service_1.PronunciationService,
            spacedRepetition_service_1.SpacedRepetitionService,
        ],
    })
], AIModule);
