import { Injectable, Logger } from '@nestjs/common';
import Groq from 'groq-sdk';
import { db } from '../../database/drizzle.js';
import { lessons } from '../../database/schema/lesson.schema.js';
import { sql } from 'drizzle-orm';

@Injectable()
export class VectorSearchService {
    private readonly logger = new Logger(VectorSearchService.name);
    private client: Groq | null = null;

    private getClient(): Groq {
        if (!this.client) {
            const apiKey = process.env.GROQ_API_KEY;
            if (!apiKey) {
                throw new Error('GROQ_API_KEY not set');
            }
            this.client = new Groq({ apiKey });
        }
        return this.client;
    }

    // Simple fake embedding using LLM summary (cheap workaround)
    private async createEmbedding(text: string): Promise<number[]> {
        const completion = await this.getClient().chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [
                {
                    role: 'system',
                    content:
                        'Convert this text into a short semantic numeric fingerprint.',
                },
                { role: 'user', content: text },
            ],
            temperature: 0,
        });

        const content = completion.choices[0]?.message?.content ?? '';

        // Create simple numeric embedding from text char codes
        return Array.from(
            { length: 1536 },
            (_, i) => content.charCodeAt(i % content.length) / 255,
        );
    }

    async indexLesson(lessonId: number, title: string, content: string) {
        const embedding = await this.createEmbedding(title + content);

        await db
            .update(lessons)
            .set({
                embedding: sql`ARRAY[${sql.join(
                    embedding.map((v) => sql`${v}`),
                    sql`,`,
                )}]`,
            })
            .where(sql`${lessons.id} = ${lessonId}`);

        this.logger.log(`Indexed lesson ${lessonId}`);
    }

    async search(query: string, limit = 5) {
        const embedding = await this.createEmbedding(query);

        const results = await db.execute(sql`
      SELECT id, title
      FROM lessons
      ORDER BY embedding <-> ARRAY[${sql.join(
            embedding.map((v) => sql`${v}`),
            sql`,`,
        )}]
      LIMIT ${limit};
    `);

        return results.rows as { id: number; title: string }[];
    }
}
