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
    console.log(
      'CREATE LESSON INPUT:',
      title,
      order,
      levelId,
      description,
      content,
    );
    return db.transaction(async (tx) => {
      // 1️⃣ Shift existing lessons down
      await tx
        .update(lessons)
        .set({
          order: sql`${lessons.order} + 1`,
        })
        .where(and(eq(lessons.levelId, levelId), gte(lessons.order, order)));

      // 2️⃣ Insert the new lesson
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
