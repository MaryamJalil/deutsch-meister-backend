import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateLevelInput,
  UpdateLevelInput,
} from '../auth/dto/levels.input.js';
import { db } from '../../database/drizzle.js';
import { levels } from '../../database/schema/level.schema.js';
import { eq } from 'drizzle-orm/index.js';

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
    console.log(level);
    return level;
  }

  async updateLevel(input: UpdateLevelInput) {
    const { id, ...data } = input;

    const [updatedLevel] = await db
      .update(levels)
      .set(data)
      .where(eq(levels.id, id))
      .returning();
    if (!updatedLevel) {
      throw new Error(`Level with id ${id} not found`);
    }
    return updatedLevel;
  }
  async getLevels() {
    const allLevels = await db.select().from(levels);
    if (!allLevels) {
      throw new NotFoundException('Levels not found');
    }
    return allLevels;
  }
  async getLevel(id: number) {
    const level = await db.select().from(levels).where(eq(levels.id, id));
    if (!level) {
      throw new NotFoundException('Level not found');
    }
    return level[0];
  }
}
