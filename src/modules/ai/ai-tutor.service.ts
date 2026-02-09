import { Injectable, Logger } from '@nestjs/common';
import { ChatAnthropic } from '@langchain/anthropic';
import { VectorSearchService } from './vector-search.service.js';

@Injectable()
export class AITutorService {
  private readonly logger = new Logger(AITutorService.name);
  private readonly anthropic: ChatAnthropic;

  constructor(private readonly vectorService: VectorSearchService) {
    this.anthropic = new ChatAnthropic({
      modelName: 'claude-3-5-sonnet-20241022',
      temperature: 0.7,
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async chat(userMessage: string) {
    const relevantLessons = await this.vectorService.search(userMessage);

    const context = relevantLessons.map((l) => `Lesson: ${l.title}`).join('\n');

    const response = await this.anthropic.invoke(`
You are a German tutor.

Relevant lessons:
${context}

Student question:
${userMessage}

Answer clearly and educationally.
`);

    return {
      message: response.content,
      relatedLessons: relevantLessons,
    };
  }
}
