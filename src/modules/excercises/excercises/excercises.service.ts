import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AIContentGeneratorService } from '../../ai/aiContentGenerator.service';
import { CacheService } from '../../cache/cache.service';
import { GenerateExercisesInput } from './excercises.model';
import { lessons } from '../../../database/schema/lesson.schema';
import { db } from '../../../database/drizzle';
import { eq } from 'drizzle-orm';
import { ExcerciseType } from '../../../common/enums/excerciseType.enum';
import { exercises } from '../../../database/schema/excercises.schems';

@Injectable()
export class ExcercisesService {
  private readonly logger = new Logger(ExcercisesService.name);
  constructor(
    private readonly aiGenerator: AIContentGeneratorService,
    private readonly chache: CacheService,
  ) {}

  async generateExercises(input: GenerateExercisesInput) {
    const { lessonId, type, count = 5 } = input;
    console.log(lessonId);
    const [lesson] = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, lessonId));
    if (!lesson) throw new NotFoundException(`Lesson ${lessonId} not found`);
    const content = lesson.content ?? lesson.title;
    const level = 'A1';
    const typesToGenerate: ExcerciseType[] = type
      ? [type]
      : [
          ExcerciseType.FILL_IN_THE_BLANK,
          ExcerciseType.LISTENING_COMPREHENSION,
          ExcerciseType.MULTIPLE_CHOICE,
          ExcerciseType.SENTENCE_ORDERING,
        ];
    const created: (typeof exercises.$inferSelect)[] = [];

    for (const excerciseType of typesToGenerate) {
      const rawItems = await this.generateByType(
        excerciseType,
        content,
        level,
        count,
      );
      for (const item of rawItems) {
        const [ex] = await db
          .insert(exercises)
          .values({
            lessonId,
            type: excerciseType,
            question: item.question,
            targetAnswer: item.targetAnswer,
            explanation: item.explanation ?? null,
            metadata: item.metadata ?? null,
            generatedByAi: true,
          })
          .returning();
        created.push(ex);
      }
    }
    await this.chache.delete(`excercises: ${lessonId}`);
    return created;
  }

  private async generateByType(
    type: ExcerciseType,
    content: string,
    level: string,
    count: number,
  ): Promise<
    Array<{
      question: string;
      targetAnswer: string;
      explanation?: string;
      metadata?: Record<string, unknown>;
    }>
  > {
    switch (type) {
      case ExcerciseType.MULTIPLE_CHOICE: {
        const items = await this.aiGenerator.generateMultipleChoiceExercises(
          content,
          level,
          count,
        );
        return items.map((i) => ({
          question: i.question,
          targetAnswer: i.options[i.correctIndex] ?? '',
          explanation: i.explanation,
          metadata: { options: i.options, correctIndex: i.correctIndex },
        }));
      }
      case ExcerciseType.FILL_IN_THE_BLANK: {
        const items = await this.aiGenerator.generateFillInBlankExercises(
          content,
          level,
          count,
        );
        return items.map((i) => ({
          question: i.sentence_with_blank,
          targetAnswer: i.answer,
          metadata: { hint: i.hint },
        }));
      }
      case ExcerciseType.SENTENCE_ORDERING: {
        const items = await this.aiGenerator.generateSentenceOrderingExercises(
          content,
          level,
          count,
        );
        return items.map((i) => ({
          question: i.prompt,
          targetAnswer: i.correctOrder.map((idx) => i.parts[idx]).join(' '),
          metadata: { parts: i.parts, correctOrder: i.correctOrder },
        }));
      }
      case ExcerciseType.LISTENING_COMPREHENSION: {
        const items = await this.aiGenerator.generateListeningExercises(
          content,
          level,
          count,
        );
        return items.map((i) => ({
          question: i.question,
          targetAnswer: i.answer,
          metadata: { textToRead: i.text_to_read, hint: i.hint },
        }));
      }
    }
  }
}
