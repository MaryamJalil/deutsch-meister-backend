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
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const vector_search_service_js_1 = require("./vector-search.service.js");
let AITutorService = AITutorService_1 = class AITutorService {
    constructor(vectorService) {
        this.vectorService = vectorService;
        this.logger = new common_1.Logger(AITutorService_1.name);
        this.client = null;
    }
    getClient() {
        if (!this.client) {
            const apiKey = process.env.GROQ_API_KEY;
            if (!apiKey) {
                throw new Error('GROQ_API_KEY is not set in environment');
            }
            this.client = new groq_sdk_1.default({ apiKey });
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
            this.logger.warn('Vector search unavailable, proceeding without context');
        }
        const prompt = `
You are a friendly and knowledgeable German language tutor.

${context ? `Relevant lessons:\n${context}\n` : ''}

Student question:
${userMessage}

Answer clearly and educationally.
`;
        try {
            const completion = await this.getClient().chat.completions.create({
                model: 'llama-3.1-8b-instant', // Free + fast
                messages: [
                    { role: 'system', content: 'You are a helpful German tutor.' },
                    { role: 'user', content: prompt },
                ],
                temperature: 0.7,
            });
            return {
                message: completion.choices[0]?.message?.content ??
                    'Could not generate response.',
                relatedLessons: lessonTitles,
            };
        }
        catch (error) {
            this.logger.error('Groq AI error', error);
            return {
                message: 'AI tutor temporarily unavailable.',
                relatedLessons: lessonTitles,
            };
        }
    }
};
exports.AITutorService = AITutorService;
exports.AITutorService = AITutorService = AITutorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [vector_search_service_js_1.VectorSearchService])
], AITutorService);
