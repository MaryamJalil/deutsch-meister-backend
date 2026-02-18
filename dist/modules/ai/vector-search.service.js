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
var VectorSearchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorSearchService = void 0;
const common_1 = require("@nestjs/common");
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const drizzle_js_1 = require("../../database/drizzle.js");
const lesson_schema_js_1 = require("../../database/schema/lesson.schema.js");
const drizzle_orm_1 = require("drizzle-orm");
let VectorSearchService = VectorSearchService_1 = class VectorSearchService {
    constructor() {
        this.logger = new common_1.Logger(VectorSearchService_1.name);
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
    // Simple fake embedding using LLM summary (cheap workaround)
    async createEmbedding(text) {
        const completion = await this.getClient().chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [
                {
                    role: 'system',
                    content: 'Convert this text into a short semantic numeric fingerprint.',
                },
                { role: 'user', content: text },
            ],
            temperature: 0,
        });
        const content = completion.choices[0]?.message?.content ?? '';
        // Create simple numeric embedding from text char codes
        return Array.from({ length: 1536 }, (_, i) => content.charCodeAt(i % content.length) / 255);
    }
    async indexLesson(lessonId, title, content) {
        const embedding = await this.createEmbedding(title + content);
        await drizzle_js_1.db
            .update(lesson_schema_js_1.lessons)
            .set({
            embedding: (0, drizzle_orm_1.sql) `ARRAY[${drizzle_orm_1.sql.join(embedding.map((v) => (0, drizzle_orm_1.sql) `${v}`), (0, drizzle_orm_1.sql) `,`)}]`,
        })
            .where((0, drizzle_orm_1.sql) `${lesson_schema_js_1.lessons.id} = ${lessonId}`);
        this.logger.log(`Indexed lesson ${lessonId}`);
    }
    async search(query, limit = 5) {
        const embedding = await this.createEmbedding(query);
        const results = await drizzle_js_1.db.execute((0, drizzle_orm_1.sql) `
      SELECT id, title
      FROM lessons
      ORDER BY embedding <-> ARRAY[${drizzle_orm_1.sql.join(embedding.map((v) => (0, drizzle_orm_1.sql) `${v}`), (0, drizzle_orm_1.sql) `,`)}]
      LIMIT ${limit};
    `);
        return results.rows;
    }
};
exports.VectorSearchService = VectorSearchService;
exports.VectorSearchService = VectorSearchService = VectorSearchService_1 = __decorate([
    (0, common_1.Injectable)()
], VectorSearchService);
