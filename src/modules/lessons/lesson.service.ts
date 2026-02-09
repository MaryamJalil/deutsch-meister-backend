import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../../database/drizzle';
import { lessons } from '../../database/schema/lesson.schema';
import { eq } from 'drizzle-orm';
import { CreateLessonInput, UpdateLessonInput } from '../auth/dto/lesson.input';

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
    return { ...lesson, vocabulary: [], examples: [] };
  }

  async updateLesson(input: UpdateLessonInput) {
    const updateData: Record<string, unknown> = {};
    if (input.title !== undefined) updateData.title = input.title;
    if (input.description !== undefined) updateData.description = input.description;
    if (input.content !== undefined) updateData.content = input.content;
    if (input.order !== undefined) updateData.order = input.order;
    if (input.levelId !== undefined) updateData.levelId = input.levelId;
    if (input.moduleId !== undefined) updateData.moduleId = input.moduleId;

    const [updatedLesson] = await db
      .update(lessons)
      .set(updateData)
      .where(eq(lessons.id, input.id))
      .returning();

    if (!updatedLesson) {
      throw new NotFoundException(`Lesson with id ${input.id} not found`);
    }
    return { ...updatedLesson, vocabulary: [], examples: [] };
  }

  async deleteLesson(id: number) {
    const [deleted] = await db
      .delete(lessons)
      .where(eq(lessons.id, id))
      .returning();

    if (!deleted) {
      throw new NotFoundException(`Lesson with id ${id} not found`);
    }
    return deleted;
  }

  async getLessons() {
    return db.select().from(lessons);
  }

  async getLesson(id: number) {
    const [lesson] = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, id));

    if (!lesson) {
      throw new NotFoundException(`Lesson with id ${id} not found`);
    }
    return lesson;
  }

  async getLessonsByLevel(levelId: number) {
    return db
      .select()
      .from(lessons)
      .where(eq(lessons.levelId, levelId));
  }

  async getLessonsByModule(moduleId: number) {
    return db
      .select()
      .from(lessons)
      .where(eq(lessons.moduleId, moduleId));
  }
}
