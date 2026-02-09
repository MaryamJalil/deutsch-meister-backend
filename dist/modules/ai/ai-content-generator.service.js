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
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
let AIContentGeneratorService = AIContentGeneratorService_1 = class AIContentGeneratorService {
    constructor() {
        this.logger = new common_1.Logger(AIContentGeneratorService_1.name);
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
    extractJson(response) {
        const jsonMatch = response.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
        if (!jsonMatch) {
            throw new Error('Failed to extract JSON from AI response');
        }
        try {
            return JSON.parse(jsonMatch[0]);
        }
        catch {
            this.logger.error('Invalid JSON from AI:', response);
            throw new Error('AI returned invalid JSON');
        }
    }
    async ask(prompt) {
        const response = await this.getClient().messages.create({
            model: 'claude-sonnet-4-5-20250929',
            max_tokens: 4096,
            messages: [{ role: 'user', content: prompt }],
        });
        const textBlock = response.content.find((block) => block.type === 'text');
        if (!textBlock || textBlock.type !== 'text') {
            throw new Error('No text response from AI');
        }
        return textBlock.text;
    }
    async generateVocabulary(input) {
        const prompt = `You are an expert language teacher.

Generate exactly ${input.count} ${input.targetLanguage} vocabulary words about "${input.topic}" for ${input.level} level learners.

Return ONLY a valid JSON array with no extra text:
[
  {
    "word": "the word in ${input.targetLanguage}",
    "meaning": "meaning in ${input.sourceLanguage}",
    "partOfSpeech": "noun/verb/adjective/etc",
    "example": "example sentence"
  }
]`;
        try {
            const response = await this.ask(prompt);
            return this.extractJson(response);
        }
        catch (error) {
            this.logger.error('Vocabulary generation failed', error);
            throw error;
        }
    }
    async generateExamples(input) {
        const prompt = `Create exactly ${input.count} example sentences using "${input.word}" for ${input.level} level learners.

Return ONLY a valid JSON array:
[
  {
    "sentence": "sentence in ${input.targetLanguage}",
    "translation": "translation in ${input.sourceLanguage}",
    "context": "when to use this"
  }
]`;
        try {
            const response = await this.ask(prompt);
            return this.extractJson(response);
        }
        catch (error) {
            this.logger.error('Example generation failed', error);
            throw error;
        }
    }
    async generateLessonContent(input) {
        const focusAreas = input.focusAreas?.join(', ') || 'grammar, vocabulary, conversation';
        const prompt = `Create a complete ${input.targetLanguage} lesson about "${input.topic}" for ${input.level} learners.

Focus on: ${focusAreas}

Return ONLY valid JSON:
{
  "title": "...",
  "description": "...",
  "content": "full lesson content as markdown",
  "vocabulary": [{"word": "...", "meaning": "..."}],
  "examples": [{"sentence": "...", "translation": "..."}],
  "exercises": ["exercise 1", "exercise 2"]
}`;
        try {
            const response = await this.ask(prompt);
            return this.extractJson(response);
        }
        catch (error) {
            this.logger.error('Lesson generation failed', error);
            throw error;
        }
    }
    async explainGrammar(concept, level, targetLanguage, sourceLanguage) {
        const prompt = `Explain the grammar concept "${concept}" in ${targetLanguage} for ${level} level learners.

Explain in ${sourceLanguage}. Provide clear examples.`;
        try {
            return await this.ask(prompt);
        }
        catch (error) {
            this.logger.error('Grammar explanation failed', error);
            throw error;
        }
    }
    async translateWithExplanation(text, sourceLanguage, targetLanguage, level) {
        const prompt = `Translate and explain "${text}"

From: ${sourceLanguage}
To: ${targetLanguage}
Level: ${level}

Return ONLY valid JSON:
{
  "translation": "...",
  "explanation": "...",
  "breakdown": ["word-by-word breakdown"]
}`;
        try {
            const response = await this.ask(prompt);
            return this.extractJson(response);
        }
        catch (error) {
            this.logger.error('Translation failed', error);
            throw error;
        }
    }
};
exports.AIContentGeneratorService = AIContentGeneratorService;
exports.AIContentGeneratorService = AIContentGeneratorService = AIContentGeneratorService_1 = __decorate([
    (0, common_1.Injectable)()
], AIContentGeneratorService);
