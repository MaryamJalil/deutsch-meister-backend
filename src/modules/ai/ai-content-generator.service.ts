import { Injectable, Logger } from '@nestjs/common';
import { ChatAnthropic } from '@langchain/anthropic';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';

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
  private readonly anthropic: ChatAnthropic;

  constructor() {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error(
        'ANTHROPIC_API_KEY is missing. Please add it to your .env file',
      );
    }

    this.anthropic = new ChatAnthropic({
      modelName: 'claude-3-haiku-20240307', // cheaper & stable
      temperature: 0.7,
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  // -------------------------------
  // Safe JSON Parser
  // -------------------------------
  private extractJson<T>(response: string): T {
    const jsonMatch = response.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from LLM response');
    }

    try {
      return JSON.parse(jsonMatch[0]);
    } catch (err) {
      this.logger.error('Invalid JSON from AI:', response);
      throw new Error('AI returned invalid JSON');
    }
  }

  // -------------------------------
  // Vocabulary Generator
  // -------------------------------
  async generateVocabulary(
    input: GenerateVocabularyInput,
  ): Promise<VocabularyItem[]> {
    const prompt = PromptTemplate.fromTemplate(`
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

    const chain = RunnableSequence.from([
      prompt,
      this.anthropic,
      new StringOutputParser(),
    ]);

    try {
      const response = await chain.invoke(input as any);
      return this.extractJson<VocabularyItem[]>(response);
    } catch (error) {
      this.logger.error('Vocabulary generation failed', error);
      throw error;
    }
  }

  // -------------------------------
  // Example Generator
  // -------------------------------
  async generateExamples(
    input: GenerateExamplesInput,
  ): Promise<ExampleSentence[]> {
    const prompt = PromptTemplate.fromTemplate(`
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

    const chain = RunnableSequence.from([
      prompt,
      this.anthropic,
      new StringOutputParser(),
    ]);

    try {
      const response = await chain.invoke(input as any);
      return this.extractJson<ExampleSentence[]>(response);
    } catch (error) {
      this.logger.error('Example generation failed', error);
      throw error;
    }
  }

  // -------------------------------
  // Lesson Generator
  // -------------------------------
  async generateLessonContent(
    input: GenerateLessonContentInput,
  ): Promise<LessonContent> {
    const focusAreas =
      input.focusAreas?.join(', ') || 'grammar, vocabulary, conversation';

    const prompt = PromptTemplate.fromTemplate(`
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

    const chain = RunnableSequence.from([
      prompt,
      this.anthropic,
      new StringOutputParser(),
    ]);

    try {
      const response = await chain.invoke({
        ...input,
        focusAreas,
      });

      return this.extractJson<LessonContent>(response);
    } catch (error) {
      this.logger.error('Lesson generation failed', error);
      throw error;
    }
  }

  // -------------------------------
  // Grammar Explanation
  // -------------------------------
  async explainGrammar(
    concept: string,
    level: string,
    targetLanguage: string,
    sourceLanguage: string,
  ): Promise<string> {
    const prompt = PromptTemplate.fromTemplate(`
Explain "{concept}" in {targetLanguage} 
for {level} level learners.

Explain in {sourceLanguage}.
Provide examples.
`);

    const chain = RunnableSequence.from([
      prompt,
      this.anthropic, // FIXED: no more openai usage
      new StringOutputParser(),
    ]);

    try {
      return await chain.invoke({
        concept,
        level,
        targetLanguage,
        sourceLanguage,
      });
    } catch (error) {
      this.logger.error('Grammar explanation failed', error);
      throw error;
    }
  }

  // -------------------------------
  // Translation with Explanation
  // -------------------------------
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
    const prompt = PromptTemplate.fromTemplate(`
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

    const chain = RunnableSequence.from([
      prompt,
      this.anthropic,
      new StringOutputParser(),
    ]);

    try {
      const response = await chain.invoke({
        text,
        sourceLanguage,
        targetLanguage,
        level,
      });

      return this.extractJson(response);
    } catch (error) {
      this.logger.error('Translation failed', error);
      throw error;
    }
  }
}
