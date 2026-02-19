import { Injectable, Logger } from '@nestjs/common';
import Groq from 'groq-sdk';

export interface Flashcard {
    front: string;
    back: string;
    example?: string;
}

@Injectable()
export class FlashcardsService {
    private readonly logger = new Logger(FlashcardsService.name);
    private client: Groq | null = null;

    private getClient(): Groq {
        if (!this.client) {
            const apiKey = process.env.GROQ_API_KEY;
            if (!apiKey) throw new Error('GROQ_API_KEY not set');
            this.client = new Groq({ apiKey });
        }
        return this.client;
    }

    async generateFlashcards(text: string, count = 10, level = 'A1'): Promise<Flashcard[]> {
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
        if (!jsonMatch) throw new Error('Invalid JSON from flashcard generator');

        return JSON.parse(jsonMatch[0]);
    }
}
