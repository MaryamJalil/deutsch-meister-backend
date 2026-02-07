import { Injectable } from '@nestjs/common';
import { db } from '../../database/drizzle.js';

import { lessons } from '../../database/schema/lesson.schema.js';
import { eq, and, sql, gte } from 'drizzle-orm/index.js';
import { CreateLessonInput } from '../auth/dto/lesson.input.js';

@Injectable()
export class LessonService {
  async createLesson(input: CreateLessonInput) {
    const [lesson] = await db
      .insert(lessons)
      .values({
        title: input.title,
        description: input.description,
        content: input.content ?? '',
        order: input.order,
        levelId: input.levelId,
        moduleId: input.moduleId ?? 0,
      })
      .returning();
    console.log(lesson);
    return { ...lesson, vocabulary: [], examples: [] };
  }
}
