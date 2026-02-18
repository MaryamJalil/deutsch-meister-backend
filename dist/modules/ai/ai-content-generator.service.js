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
var AIContentGeneratorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIContentGeneratorService = void 0;
const common_1 = require("@nestjs/common");
const groq_sdk_1 = __importDefault(require("groq-sdk"));
let AIContentGeneratorService = AIContentGeneratorService_1 = class AIContentGeneratorService {
    constructor() {
        this.logger = new common_1.Logger(AIContentGeneratorService_1.name);
        this.client = null;
    }
    getClient() {
        if (!this.client) {
            const apiKey = process.env.GROQ_API_KEY;
            if (!apiKey) {
                throw new Error('GROQ_API_KEY not set');
            }
            this.client = new groq_sdk_1.default({ apiKey });
        }
        return this.client;
    }
    async generateVocabulary(input) {
        const { topic, level, count = 5 } = input;
        const prompt = `
Generate ${count} German vocabulary words about "${topic}" 
for ${level} level learners.

Return ONLY valid JSON array like:
[
 { "word": "...", "meaning": "...", "example": "..." }
]
`;
        const completion = await this.getClient().chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [
                { role: 'system', content: 'You are a German teacher.' },
                { role: 'user', content: prompt },
            ],
            temperature: 0.7,
        });
        const text = completion.choices[0]?.message?.content ?? '';
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (!jsonMatch)
            throw new Error('Invalid JSON response');
        return JSON.parse(jsonMatch[0]);
    }
    async generateExamples(input) {
        const prompt = `
Generate 3 example sentences in German using the word "${input.word}".
Level: ${input.level}.
Return JSON array of sentences.
`;
        const completion = await this.getClient().chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: prompt }],
        });
        const text = completion.choices[0]?.message?.content ?? '';
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (!jsonMatch)
            throw new Error('Invalid JSON');
        return JSON.parse(jsonMatch[0]);
    }
    async explainGrammar(concept, level, targetLanguage, sourceLanguage) {
        const prompt = `
Explain the German grammar concept "${concept}" 
for ${level} learners.

Explain in ${sourceLanguage}.
Include examples in ${targetLanguage}.
`;
        const completion = await this.getClient().chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: prompt }],
        });
        return completion.choices[0]?.message?.content ?? '';
    }
    async translateWithExplanation(text, sourceLanguage, targetLanguage, level) {
        const prompt = `
Translate this text from ${sourceLanguage} to ${targetLanguage}:

"${text}"

Explain grammar decisions briefly for ${level} learner.
`;
        const completion = await this.getClient().chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: prompt }],
        });
        return completion.choices[0]?.message?.content ?? '';
    }
};
exports.AIContentGeneratorService = AIContentGeneratorService;
exports.AIContentGeneratorService = AIContentGeneratorService = AIContentGeneratorService_1 = __decorate([
    (0, common_1.Injectable)()
], AIContentGeneratorService);
