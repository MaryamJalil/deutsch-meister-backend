import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateExampleInput,
  UpdateExampleInput,
} from '../auth/dto/example.input';
import { db } from '../../database/drizzle';
import { examples } from '../../database/schema/example.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ExampleService {
  async createExample(input: CreateExampleInput) {
    const [example] = await db
      .insert(examples)
      .values({
        sentence: input.sentence,
        translation: input.translation,
        lessonId: input.lessonId,
      })
      .returning();
    return example;
  }

  async updateExample(input: UpdateExampleInput) {
    const updateData: Record<string, unknown> = {};
    if (input.sentence !== undefined) updateData.sentence = input.sentence;
    if (input.translation !== undefined) updateData.translation = input.translation;
    if (input.lessonId !== undefined) updateData.lessonId = input.lessonId;

    const [updatedExample] = await db
      .update(examples)
      .set(updateData)
      .where(eq(examples.id, input.id))
      .returning();

    if (!updatedExample) {
      throw new NotFoundException(`Example with id ${input.id} not found`);
    }
    return updatedExample;
  }

  async deleteExample(id: number) {
    const [deletedExample] = await db
      .delete(examples)
      .where(eq(examples.id, id))
      .returning();

    if (!deletedExample) {
      throw new NotFoundException(`Example with id ${id} not found`);
    }
    return deletedExample;
  }

  async getExamples() {
    return db.select().from(examples);
  }

  async getExample(id: number) {
    const [example] = await db
      .select()
      .from(examples)
      .where(eq(examples.id, id));

    if (!example) {
      throw new NotFoundException(`Example with id ${id} not found`);
    }
    return example;
  }

  async getExamplesByLesson(lessonId: number) {
    return db
      .select()
      .from(examples)
      .where(eq(examples.lessonId, lessonId));
  }
}
