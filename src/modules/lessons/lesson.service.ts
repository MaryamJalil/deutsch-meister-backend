import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../../database/drizzle.js';

import { lessons } from '../../database/schema/lesson.schema.js';
import { eq, and, sql, gte } from 'drizzle-orm/index.js';
import {
  CreateLessonInput,
  UpdateLessonInput,
} from '../auth/dto/lesson.input.js';

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
        moduleId: input.moduleId ?? null,
      })
      .returning();
    console.log(lesson);
    return { ...lesson, vocabulary: [], examples: [] };
  }
  async updateLesson(input: UpdateLessonInput) {
    const [updatedLesson] = await db
      .update(lessons)
      .set({
        title: input.title,
        description: input.description,
        content: input.content,
        order: input.order,
        levelId: input.levelId,
        moduleId: input.moduleId,
      })
      .where(eq(lessons.id, input.id))
      .returning();
    if (!updatedLesson) {
      throw new NotFoundException('Lesson Not Found');
    }
    return { ...updatedLesson, vocabulary: [], examples: [] };
  }
  async getLessons() {
    const allLesson = await db.select().from(lessons);
    if (!allLesson) {
      throw new NotFoundException('Lessons not found');
    }
    return allLesson;
  }
  async getLesson(id: number) {
    const lesson = await db.select().from(lessons).where(eq(lessons.id, id));
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson[0];
  }
}
