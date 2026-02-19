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
var PronunciationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PronunciationService = void 0;
const common_1 = require("@nestjs/common");
const groq_sdk_1 = __importDefault(require("groq-sdk"));
let PronunciationService = PronunciationService_1 = class PronunciationService {
    constructor() {
        this.logger = new common_1.Logger(PronunciationService_1.name);
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
    async phonetic(text, language = 'German') {
        const prompt = `Provide the phonetic transcription (IPA) and a simplified pronunciation guide for this ${language} text. Return JSON: {"ipa":"...","simplified":"..."}

Text: """
${text}
"""
`;
        const completion = await this.getClient().chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0,
        });
        const content = completion.choices[0]?.message?.content ?? '';
        const objMatch = content.match(/\{[\s\S]*\}/);
        if (!objMatch)
            throw new Error('Invalid phonetic response');
        return JSON.parse(objMatch[0]);
    }
};
exports.PronunciationService = PronunciationService;
exports.PronunciationService = PronunciationService = PronunciationService_1 = __decorate([
    (0, common_1.Injectable)()
], PronunciationService);
