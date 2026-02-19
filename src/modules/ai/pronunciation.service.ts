import { Injectable, Logger } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class PronunciationService {
    private readonly logger = new Logger(PronunciationService.name);
    private client: Groq | null = null;

    private getClient(): Groq {
        if (!this.client) {
            const apiKey = process.env.GROQ_API_KEY;
            if (!apiKey) throw new Error('GROQ_API_KEY not set');
            this.client = new Groq({ apiKey });
        }
        return this.client;
    }

    async phonetic(text: string, language = 'German'): Promise<{ ipa: string; simplified: string }> {
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
        if (!objMatch) throw new Error('Invalid phonetic response');

        return JSON.parse(objMatch[0]);
    }
}
