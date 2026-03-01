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
        console.log(count, prompt);
        const completion = await this.getClient().chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [
                { role: 'system', content: 'You are a German teacher.' },
                { role: 'user', content: prompt },
            ],
            temperature: 0.7,
        });
        console.log(completion, 'completion');
        const text = completion.choices[0]?.message?.content ?? '';
        console.log(text, 'text');
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        console.log(jsonMatch, 'jsonMatch');
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
    async generateLessonOutline(input) {
        const { topic, level, sections = 3 } = input;
        const prompt = `
Create a lesson outline in JSON for German learners.
Topic: ${topic}
Level: ${level}
Sections: ${sections}

Return ONLY valid JSON object like:
{
  "title": "...",
  "objectives": ["..."],
  "sections": [{ "title": "...", "content": "..." }]
}
`;
        const completion = await this.getClient().chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
        });
        const text = completion.choices[0]?.message?.content ?? '';
        const objMatch = text.match(/\{[\s\S]*\}/);
        if (!objMatch)
            throw new Error('Invalid JSON response for lesson outline');
        return JSON.parse(objMatch[0]);
    }
    async generateQuiz(input) {
        const { text, count, level } = input;
        const prompt = `
Generate ${count} multiple-choice questions (with 4 options each) based on the following content for ${level} German learners.
Content: ${text}

Return ONLY a JSON array like:
[
  { "question": "...", "options": ["a","b","c","d"], "answer": "...", "explanation": "..." }
]
`;
        const completion = await this.getClient().chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
        });
        const textResp = completion.choices[0]?.message?.content ?? '';
        const jsonMatch = textResp.match(/\[[\s\S]*\]/);
        if (!jsonMatch)
            throw new Error('Invalid JSON response for quiz');
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
    async summarizeText(text, targetLanguage) {
        const prompt = `
Summarize the following text in ${targetLanguage} in a short paragraph suitable for learners:

"""
${text}
"""
`;
        const completion = await this.getClient().chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: prompt }],
        });
        return completion.choices[0]?.message?.content ?? '';
    }
    async paraphraseText(text, level) {
        const prompt = `
Paraphrase the following text to be appropriate for a ${level} German learner. Keep meaning but simplify vocabulary and sentence structure:

"""
${text}
"""
`;
        const completion = await this.getClient().chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: prompt }],
        });
        return completion.choices[0]?.message?.content ?? '';
    }
    async generateMultipleChoiceExercises(lessonContent, level, count) {
        const prompt = `
Based on the following German lesson content for ${level} learners, generate ${count} multiple-choice questions.

Lesson content:
"""
${lessonContent}
"""

Return ONLY valid JSON array:
[
  { "question": "...", "options": ["a","b","c","d"], "correctIndex": 0, "explanation": "..." }
]
correctIndex is the 0-based index of the correct option.
`;
        const completion = await this.getClient().chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.5,
        });
        const text = completion.choices[0]?.message?.content ?? '';
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (!jsonMatch)
            throw new Error('Invalid JSON for multiple choice');
        return JSON.parse(jsonMatch[0]);
    }
    async generateFillInBlankExercises(lessonContent, level, count) {
        const prompt = `
Based on the following German lesson content for ${level} learners, generate ${count} fill-in-the-blank exercises.

Lesson content:
"""
${lessonContent}
"""

Return ONLY valid JSON array:
[
  { "sentence_with_blank": "Ich ___ nach Hause.", "answer": "gehe", "hint": "verb for 'to go'" }
]
Replace the missing word with ___ (three underscores).
`;
        const completion = await this.getClient().chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.5,
        });
        const text = completion.choices[0]?.message?.content ?? '';
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (!jsonMatch)
            throw new Error('Invalid JSON for fill-in-blank');
        return JSON.parse(jsonMatch[0]);
    }
    async generateSentenceOrderingExercises(lessonContent, level, count) {
        const prompt = `
Based on the following German lesson content for ${level} learners, generate ${count} sentence ordering exercises.

Lesson content:
"""
${lessonContent}
"""

Return ONLY valid JSON array:
[
  {
    "prompt": "Arrange the words to form a correct German sentence.",
    "parts": ["Hause", "Ich", "nach", "gehe"],
    "correctOrder": [1, 3, 2, 0]
  }
]
correctOrder is the array of original indices forming the correct sentence.
`;
        const completion = await this.getClient().chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.5,
        });
        const text = completion.choices[0]?.message?.content ?? '';
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (!jsonMatch)
            throw new Error('Invalid JSON for sentence ordering');
        return JSON.parse(jsonMatch[0]);
    }
    async generateListeningExercises(lessonContent, level, count) {
        const prompt = `
Based on the following German lesson content for ${level} learners, generate ${count} listening comprehension exercises.

Lesson content:
"""
${lessonContent}
"""

Return ONLY valid JSON array:
[
  {
    "text_to_read": "Ich wohne in Berlin. Die Stadt ist sehr schön.",
    "question": "Where does the speaker live?",
    "answer": "Berlin",
    "hint": "Listen for a city name."
  }
]
The text_to_read is what would be spoken aloud. The question tests comprehension.
`;
        const completion = await this.getClient().chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.5,
        });
        const text = completion.choices[0]?.message?.content ?? '';
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (!jsonMatch)
            throw new Error('Invalid JSON for listening exercises');
        return JSON.parse(jsonMatch[0]);
    }
};
exports.AIContentGeneratorService = AIContentGeneratorService;
exports.AIContentGeneratorService = AIContentGeneratorService = AIContentGeneratorService_1 = __decorate([
    (0, common_1.Injectable)()
], AIContentGeneratorService);
