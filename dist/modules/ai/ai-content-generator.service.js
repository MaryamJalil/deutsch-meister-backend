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
var AIContentGeneratorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIContentGeneratorService = void 0;
const common_1 = require("@nestjs/common");
const anthropic_1 = require("@langchain/anthropic");
const prompts_1 = require("@langchain/core/prompts");
const output_parsers_1 = require("@langchain/core/output_parsers");
const runnables_1 = require("@langchain/core/runnables");
let AIContentGeneratorService = AIContentGeneratorService_1 = class AIContentGeneratorService {
    constructor() {
        this.logger = new common_1.Logger(AIContentGeneratorService_1.name);
        if (!process.env.ANTHROPIC_API_KEY) {
            throw new Error('ANTHROPIC_API_KEY is missing. Please add it to your .env file');
        }
        this.anthropic = new anthropic_1.ChatAnthropic({
            modelName: 'claude-3-haiku-20240307', // cheaper & stable
            temperature: 0.7,
            apiKey: process.env.ANTHROPIC_API_KEY,
        });
    }
    // -------------------------------
    // Safe JSON Parser
    // -------------------------------
    extractJson(response) {
        const jsonMatch = response.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
        if (!jsonMatch) {
            throw new Error('Failed to extract JSON from LLM response');
        }
        try {
            return JSON.parse(jsonMatch[0]);
        }
        catch (err) {
            this.logger.error('Invalid JSON from AI:', response);
            throw new Error('AI returned invalid JSON');
        }
    }
    // -------------------------------
    // Vocabulary Generator
    // -------------------------------
    async generateVocabulary(input) {
        const prompt = prompts_1.PromptTemplate.fromTemplate(`
You are an expert language teacher.

Generate exactly {count} {targetLanguage} vocabulary words about "{topic}" for {level} level learners.

Return ONLY valid JSON array:
[
  {
    "word": "...",
    "meaning": "...",
    "partOfSpeech": "...",
    "example": "..."
  }
]
`);
        const chain = runnables_1.RunnableSequence.from([
            prompt,
            this.anthropic,
            new output_parsers_1.StringOutputParser(),
        ]);
        try {
            const response = await chain.invoke(input);
            return this.extractJson(response);
        }
        catch (error) {
            this.logger.error('Vocabulary generation failed', error);
            throw error;
        }
    }
    // -------------------------------
    // Example Generator
    // -------------------------------
    async generateExamples(input) {
        const prompt = prompts_1.PromptTemplate.fromTemplate(`
Create exactly {count} example sentences using "{word}" 
for {level} level learners.

Return ONLY JSON array:
[
  {
    "sentence": "...",
    "translation": "...",
    "context": "..."
  }
]
`);
        const chain = runnables_1.RunnableSequence.from([
            prompt,
            this.anthropic,
            new output_parsers_1.StringOutputParser(),
        ]);
        try {
            const response = await chain.invoke(input);
            return this.extractJson(response);
        }
        catch (error) {
            this.logger.error('Example generation failed', error);
            throw error;
        }
    }
    // -------------------------------
    // Lesson Generator
    // -------------------------------
    async generateLessonContent(input) {
        const focusAreas = input.focusAreas?.join(', ') || 'grammar, vocabulary, conversation';
        const prompt = prompts_1.PromptTemplate.fromTemplate(`
Create a complete {targetLanguage} lesson about "{topic}" 
for {level} learners.

Focus on: {focusAreas}

Return ONLY JSON:
{
  "title": "...",
  "description": "...",
  "content": "...",
  "vocabulary": [],
  "examples": [],
  "exercises": []
}
`);
        const chain = runnables_1.RunnableSequence.from([
            prompt,
            this.anthropic,
            new output_parsers_1.StringOutputParser(),
        ]);
        try {
            const response = await chain.invoke({
                ...input,
                focusAreas,
            });
            return this.extractJson(response);
        }
        catch (error) {
            this.logger.error('Lesson generation failed', error);
            throw error;
        }
    }
    // -------------------------------
    // Grammar Explanation
    // -------------------------------
    async explainGrammar(concept, level, targetLanguage, sourceLanguage) {
        const prompt = prompts_1.PromptTemplate.fromTemplate(`
Explain "{concept}" in {targetLanguage} 
for {level} level learners.

Explain in {sourceLanguage}.
Provide examples.
`);
        const chain = runnables_1.RunnableSequence.from([
            prompt,
            this.anthropic, // FIXED: no more openai usage
            new output_parsers_1.StringOutputParser(),
        ]);
        try {
            return await chain.invoke({
                concept,
                level,
                targetLanguage,
                sourceLanguage,
            });
        }
        catch (error) {
            this.logger.error('Grammar explanation failed', error);
            throw error;
        }
    }
    // -------------------------------
    // Translation with Explanation
    // -------------------------------
    async translateWithExplanation(text, sourceLanguage, targetLanguage, level) {
        const prompt = prompts_1.PromptTemplate.fromTemplate(`
Translate and explain "{text}"

From: {sourceLanguage}
To: {targetLanguage}
Level: {level}

Return ONLY JSON:
{
  "translation": "...",
  "explanation": "...",
  "breakdown": []
}
`);
        const chain = runnables_1.RunnableSequence.from([
            prompt,
            this.anthropic,
            new output_parsers_1.StringOutputParser(),
        ]);
        try {
            const response = await chain.invoke({
                text,
                sourceLanguage,
                targetLanguage,
                level,
            });
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
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AIContentGeneratorService);
