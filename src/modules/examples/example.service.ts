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
    const [updatedExample] = await db
      .update(examples)
      .set({
        sentence: input.sentence,
        translation: input.translation,
        lessonId: input.lessonId,
      })
      .where(eq(examples.id, input.id))
      .returning();
    if (!updatedExample) {
      throw new NotFoundException('example Not Found');
    }
    return { ...updatedExample };
  }

  async deleteExample(id: number) {
    const [deletedExample] = await db
      .delete(examples)
      .where(eq(examples.id, id))
      .returning();

    if (!deletedExample) {
      throw new NotFoundException('Example not found');
    }

    return deletedExample;
  }
  async getExamples() {
    const allExamples = await db.select().from(examples);
    if (!allExamples) {
      throw new NotFoundException('Examples not found');
    }
    return allExamples;
  }
  async getExample(id: number) {
    const example = await db.select().from(examples).where(eq(examples.id, id));
    if (!example) {
      throw new NotFoundException('Example not found');
    }
    return example[0];
  }
}
