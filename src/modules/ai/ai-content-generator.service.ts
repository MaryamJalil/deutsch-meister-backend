import { Injectable, Logger } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';

export interface GenerateVocabularyInput {
  topic: string;
  level: string;
  count: number;
  targetLanguage: string;
  sourceLanguage: string;
}

export interface GenerateExamplesInput {
  word: string;
  level: string;
  count: number;
  targetLanguage: string;
  sourceLanguage: string;
}

export interface GenerateLessonContentInput {
  topic: string;
  level: string;
  targetLanguage: string;
  sourceLanguage: string;
  focusAreas?: string[];
}

export interface VocabularyItem {
  word: string;
  meaning: string;
  partOfSpeech?: string;
  example?: string;
}

export interface ExampleSentence {
  sentence: string;
  translation: string;
  context?: string;
}

export interface LessonContent {
  title: string;
  description: string;
  content: string;
  vocabulary: VocabularyItem[];
  examples: ExampleSentence[];
  exercises?: string[];
}

@Injectable()
export class AIContentGeneratorService {
  private readonly logger = new Logger(AIContentGeneratorService.name);
  private client: Anthropic | null = null;

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

  private extractJson<T>(response: string): T {
    const jsonMatch = response.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from AI response');
    }
    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      this.logger.error('Invalid JSON from AI:', response);
      throw new Error('AI returned invalid JSON');
    }
  }

  private async ask(prompt: string): Promise<string> {
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

  async generateVocabulary(
    input: GenerateVocabularyInput,
  ): Promise<VocabularyItem[]> {
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
      return this.extractJson<VocabularyItem[]>(response);
    } catch (error) {
      this.logger.error('Vocabulary generation failed', error);
      throw error;
    }
  }

  async generateExamples(
    input: GenerateExamplesInput,
  ): Promise<ExampleSentence[]> {
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
      return this.extractJson<ExampleSentence[]>(response);
    } catch (error) {
      this.logger.error('Example generation failed', error);
      throw error;
    }
  }

  async generateLessonContent(
    input: GenerateLessonContentInput,
  ): Promise<LessonContent> {
    const focusAreas =
      input.focusAreas?.join(', ') || 'grammar, vocabulary, conversation';

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
      return this.extractJson<LessonContent>(response);
    } catch (error) {
      this.logger.error('Lesson generation failed', error);
      throw error;
    }
  }

  async explainGrammar(
    concept: string,
    level: string,
    targetLanguage: string,
    sourceLanguage: string,
  ): Promise<string> {
    const prompt = `Explain the grammar concept "${concept}" in ${targetLanguage} for ${level} level learners.

Explain in ${sourceLanguage}. Provide clear examples.`;

    try {
      return await this.ask(prompt);
    } catch (error) {
      this.logger.error('Grammar explanation failed', error);
      throw error;
    }
  }

  async translateWithExplanation(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
    level: string,
  ): Promise<{
    translation: string;
    explanation: string;
    breakdown?: string[];
  }> {
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
    } catch (error) {
      this.logger.error('Translation failed', error);
      throw error;
    }
  }
}
