import { Injectable, Logger } from '@nestjs/common';
import Groq from 'groq-sdk';
import { VectorSearchService } from './vectorSearch.service.js';

@Injectable()
export class AITutorService {
    private readonly logger = new Logger(AITutorService.name);
    private client: Groq | null = null;

    constructor(private readonly vectorService: VectorSearchService) { }

    private getClient(): Groq {
        if (!this.client) {
            const apiKey = process.env.GROQ_API_KEY;
            if (!apiKey) {
                throw new Error('GROQ_API_KEY is not set in environment');
            }
            this.client = new Groq({ apiKey });
        }
        return this.client;
    }

    async chat(
        userMessage: string,
    ): Promise<{ message: string; relatedLessons: string[] }> {
        let context = '';
        let lessonTitles: string[] = [];

        try {
            const relevantLessons = await this.vectorService.search(userMessage);
            lessonTitles = relevantLessons
                .map((l) => l.title)
                .filter((t): t is string => typeof t === 'string');

            context = lessonTitles.map((t) => `- ${t}`).join('\n');
        } catch (error) {
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
                message:
                    completion.choices[0]?.message?.content ??
                    'Could not generate response.',
                relatedLessons: lessonTitles,
            };
        } catch (error: any) {
            this.logger.error('Groq AI error', error);
            return {
                message: 'AI tutor temporarily unavailable.',
                relatedLessons: lessonTitles,
            };
        }
    }
}
