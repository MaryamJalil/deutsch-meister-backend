import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLevelInput, UpdateLevelInput } from '../auth/dto/levels.input';
import { db } from '../../database/drizzle';
import { levels } from '../../database/schema/level.schema';
import { eq, and, isNull } from 'drizzle-orm';

@Injectable()
export class LevelService {
  async createLevel(input: CreateLevelInput) {
    const [level] = await db
      .insert(levels)
      .values({
        code: input.code,
        position: input.position,
        courseId: input.courseId,
      })
      .returning();
    return level;
  }

  async updateLevel(input: UpdateLevelInput) {
    const { id, ...rest } = input;
    const updateData: Record<string, unknown> = {};
    if (rest.code !== undefined) updateData.code = rest.code;
    if (rest.position !== undefined) updateData.position = rest.position;
    if (rest.courseId !== undefined) updateData.courseId = rest.courseId;

    const [updatedLevel] = await db
      .update(levels)
      .set(updateData)
      .where(eq(levels.id, id))
      .returning();

    if (!updatedLevel) {
      throw new NotFoundException(`Level with id ${id} not found`);
    }
    return updatedLevel;
  }

  async deleteLevel(id: number) {
    const [deleted] = await db
      .update(levels)
      .set({ deletedAt: new Date() })
      .where(eq(levels.id, id))
      .returning();

    if (!deleted) {
      throw new NotFoundException(`Level with id ${id} not found`);
    }
    return deleted;
  }

  async getLevels() {
    return db.select().from(levels).where(isNull(levels.deletedAt));
  }

  async getLevel(id: number) {
    const [level] = await db
      .select()
      .from(levels)
      .where(eq(levels.id, id));

    if (!level) {
      throw new NotFoundException(`Level with id ${id} not found`);
    }
    return level;
  }

  async getLevelsByCourse(courseId: number) {
    return db
      .select()
      .from(levels)
      .where(and(eq(levels.courseId, courseId), isNull(levels.deletedAt)));
  }
}
