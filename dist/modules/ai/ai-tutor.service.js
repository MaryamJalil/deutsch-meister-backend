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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AITutorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AITutorService = void 0;
const common_1 = require("@nestjs/common");
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const vector_search_service_1 = require("./vector-search.service");
let AITutorService = AITutorService_1 = class AITutorService {
    constructor(vectorService) {
        this.vectorService = vectorService;
        this.logger = new common_1.Logger(AITutorService_1.name);
        this.client = null;
    }
    getClient() {
        if (!this.client) {
            const apiKey = process.env.ANTHROPIC_API_KEY;
            if (!apiKey) {
                throw new Error('ANTHROPIC_API_KEY is not set in environment');
            }
            this.client = new sdk_1.default({ apiKey });
        }
        return this.client;
    }
    async chat(userMessage) {
        let context = '';
        let lessonTitles = [];
        try {
            const relevantLessons = await this.vectorService.search(userMessage);
            lessonTitles = relevantLessons
                .map((l) => l.title)
                .filter((t) => typeof t === 'string');
            context = lessonTitles.map((t) => `- ${t}`).join('\n');
        }
        catch (error) {
            this.logger.warn('Vector search unavailable, proceeding without context', error);
        }
        const prompt = `You are a friendly and knowledgeable German language tutor.
${context ? `\nRelevant lessons from our curriculum:\n${context}\n` : ''}
Student question: ${userMessage}

Answer clearly and educationally. Use examples where helpful. If relevant, reference the lesson topics above.`;
        const response = await this.getClient().messages.create({
            model: 'claude-sonnet-4-5-20250929',
            max_tokens: 2048,
            messages: [{ role: 'user', content: prompt }],
        });
        const textBlock = response.content.find((block) => block.type === 'text');
        const message = textBlock && textBlock.type === 'text' ? textBlock.text : 'Sorry, I could not generate a response.';
        return {
            message,
            relatedLessons: lessonTitles,
        };
    }
};
exports.AITutorService = AITutorService;
exports.AITutorService = AITutorService = AITutorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [vector_search_service_1.VectorSearchService])
], AITutorService);
