import { Injectable, Logger } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';
import { VectorSearchService } from './vector-search.service';

@Injectable()
export class AITutorService {
  private readonly logger = new Logger(AITutorService.name);
  private client: Anthropic | null = null;

  constructor(private readonly vectorService: VectorSearchService) {}

  private getClient(): Anthropic {
    if (!this.client) {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        throw new Error('ANTHROPIC_API_KEY is not set in environment');
      }
      this.client = new Anthropic({ apiKey });
    }
    return this.client;
  }

  async chat(userMessage: string): Promise<{ message: string; relatedLessons: string[] }> {
    let context = '';
    let lessonTitles: string[] = [];

    try {
      const relevantLessons = await this.vectorService.search(userMessage);
      lessonTitles = relevantLessons
        .map((l) => l.title)
        .filter((t): t is string => typeof t === 'string');
      context = lessonTitles.map((t) => `- ${t}`).join('\n');
    } catch (error) {
      this.logger.warn('Vector search unavailable, proceeding without context', error);
    }

    const prompt = `You are a friendly and knowledgeable German language tutor.
${context ? `\nRelevant lessons from our curriculum:\n${context}\n` : ''}
Student question: ${userMessage}

Answer clearly and educationally. Use examples where helpful. If relevant, reference the lesson topics above.`;

    const response = await this.getClient().messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    });

    const textBlock = response.content.find((block) => block.type === 'text');
    const message = textBlock && textBlock.type === 'text' ? textBlock.text : 'Sorry, I could not generate a response.';

    return {
      message,
      relatedLessons: lessonTitles,
    };
  }
}
