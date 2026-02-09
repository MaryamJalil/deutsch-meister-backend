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
var AITutorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AITutorService = void 0;
const common_1 = require("@nestjs/common");
const anthropic_1 = require("@langchain/anthropic");
const vector_search_service_js_1 = require("./vector-search.service.js");
let AITutorService = AITutorService_1 = class AITutorService {
    constructor(vectorService) {
        this.vectorService = vectorService;
        this.logger = new common_1.Logger(AITutorService_1.name);
        this.anthropic = new anthropic_1.ChatAnthropic({
            modelName: 'claude-3-5-sonnet-20241022',
            temperature: 0.7,
            apiKey: process.env.ANTHROPIC_API_KEY,
        });
    }
    async chat(userMessage) {
        const relevantLessons = await this.vectorService.search(userMessage);
        const context = relevantLessons.map((l) => `Lesson: ${l.title}`).join('\n');
        const response = await this.anthropic.invoke(`
You are a German tutor.

Relevant lessons:
${context}

Student question:
${userMessage}

Answer clearly and educationally.
`);
        return {
            message: response.content,
            relatedLessons: relevantLessons,
        };
    }
};
exports.AITutorService = AITutorService;
exports.AITutorService = AITutorService = AITutorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [vector_search_service_js_1.VectorSearchService])
], AITutorService);
