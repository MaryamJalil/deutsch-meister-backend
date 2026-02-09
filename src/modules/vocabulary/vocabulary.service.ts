import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../../database/drizzle';
import {
  CreateVocabularyInput,
  UpdateVocabularyInput,
} from '../auth/dto/vocabulary.input';
import { eq, sql } from 'drizzle-orm';
import { vocabularies } from '../../database/schema/vocabulary.schema';

@Injectable()
export class VocabularyService {
  async createVocabulary(input: CreateVocabularyInput) {
    const [vocabulary] = await db
      .insert(vocabularies)
      .values({
        word: input.word,
        meaning: input.meaning,
        lessonId: input.lessonId,
      })
      .returning();
    return vocabulary;
  }

  async updateVocabulary(input: UpdateVocabularyInput) {
    const updateData: Record<string, unknown> = {};
    if (input.word !== undefined) updateData.word = input.word;
    if (input.meaning !== undefined) updateData.meaning = input.meaning;
    if (input.lessonId !== undefined) updateData.lessonId = input.lessonId;

    const [updatedVocabulary] = await db
      .update(vocabularies)
      .set(updateData)
      .where(eq(vocabularies.id, input.id))
      .returning();

    if (!updatedVocabulary) {
      throw new NotFoundException(`Vocabulary with id ${input.id} not found`);
    }
    return updatedVocabulary;
  }

  async deleteVocabulary(id: number) {
    const [deleted] = await db
      .delete(vocabularies)
      .where(eq(vocabularies.id, id))
      .returning();

    if (!deleted) {
      throw new NotFoundException(`Vocabulary with id ${id} not found`);
    }
    return deleted;
  }

  async getVocabularies() {
    return db.select().from(vocabularies);
  }

  async getVocabulary(id: number) {
    const [vocabulary] = await db
      .select()
      .from(vocabularies)
      .where(eq(vocabularies.id, id));

    if (!vocabulary) {
      throw new NotFoundException(`Vocabulary with id ${id} not found`);
    }
    return vocabulary;
  }

  async getVocabularyByLesson(lessonId: number) {
    return db
      .select()
      .from(vocabularies)
      .where(eq(vocabularies.lessonId, lessonId));
  }

  async searchVocabulary(searchTerm: string) {
    return db
      .select()
      .from(vocabularies)
      .where(
        sql`LOWER(${vocabularies.word}) LIKE LOWER(${'%' + searchTerm + '%'})`,
      );
  }
}
