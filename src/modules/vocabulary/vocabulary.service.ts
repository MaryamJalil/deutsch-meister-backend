import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../../database/drizzle.js';
// import { vocabularies } from '../../../src/database/schema/vocabulary.schema.js';
import {
  CreateVocabularyInput,
  UpdateVocabularyInput,
} from '../auth/dto/vocabulary.input.js';
import { eq, sql } from 'drizzle-orm/index.js';
import { vocabularies } from '../../database/schema/vocabulary.schema.js';

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
    const { id, ...data } = input;
    const [updatedVocabulary] = await db
      .update(vocabularies)
      .set(data)
      .where(eq(vocabularies.id, id))
      .returning();
    if (!updatedVocabulary) {
      throw new Error(`Vocabulary with id ${id} not found`);
    }
    return updatedVocabulary;
  }
  async getVocabularies() {
    const allVocabularies = await db.select().from(vocabularies);
    if (!vocabularies) {
      throw new NotFoundException('Vocabularies not found');
    }
    return allVocabularies;
  }
  async getVocabulary(id: number) {
    const vocabulary = await db
      .select()
      .from(vocabularies)
      .where(eq(vocabularies.id, id));
    if (!vocabulary) {
      throw new NotFoundException('Vocabulary not found');
    }
    return vocabulary[0];
  }
  async searchVocabulary(searchTerm: String) {
    const results = await db
      .select()
      .from(vocabularies)
      .where(
        sql`LOWER (${vocabularies.word}) LIKE LOWER(${'%' + searchTerm + '%'})`,
      );
  }
}
