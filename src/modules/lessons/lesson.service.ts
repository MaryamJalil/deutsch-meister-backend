import { Injectable } from '@nestjs/common';
import { db } from '../../database/drizzle.js';

import { lessons } from '../../database/schema/lesson.schema.js';
import { eq, and, sql, gte } from 'drizzle-orm/index.js';

@Injectable()
export class LessonService {
  async createLessonAtPosition(
    title: string,
    order: number,
    levelId: number,
    description?: string,
    content?: string,
  ) {

    return db.transaction(async (tx) => {
      await tx
        .update(lessons)
        .set({
          order: sql`${lessons.order} + 1`,
        })
        .where(and(eq(lessons.levelId, levelId), gte(lessons.order, order)));

      const [lesson] = await tx
        .insert(lessons)
        .values({
          title,
          content: content ?? '',
          order,
          levelId,
          description,
        })
        .returning();

      return lesson;
    });
  }
}
