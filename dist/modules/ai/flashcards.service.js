"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var FlashcardsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashcardsService = void 0;
const common_1 = require("@nestjs/common");
const groq_sdk_1 = __importDefault(require("groq-sdk"));
let FlashcardsService = FlashcardsService_1 = class FlashcardsService {
    constructor() {
        this.logger = new common_1.Logger(FlashcardsService_1.name);
        this.client = null;
    }
    getClient() {
        if (!this.client) {
            const apiKey = process.env.GROQ_API_KEY;
            if (!apiKey)
                throw new Error('GROQ_API_KEY not set');
            this.client = new groq_sdk_1.default({ apiKey });
        }
        return this.client;
    }
    async generateFlashcards(text, count = 10, level = 'A1') {
        const prompt = `Generate ${count} flashcards for German learners (level: ${level}) using the content below. Return ONLY a JSON array like [{"front":"...","back":"...","example":"..."}, ...]

Content:
"""
${text}
"""
`;
        const completion = await this.getClient().chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
        });
        const textResp = completion.choices[0]?.message?.content ?? '';
        const jsonMatch = textResp.match(/\[[\s\S]*\]/);
        if (!jsonMatch)
            throw new Error('Invalid JSON from flashcard generator');
        return JSON.parse(jsonMatch[0]);
    }
};
exports.FlashcardsService = FlashcardsService;
exports.FlashcardsService = FlashcardsService = FlashcardsService_1 = __decorate([
    (0, common_1.Injectable)()
], FlashcardsService);
