import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { lessons } from './lesson.schema.js';

export const vocabularies = pgTable(
  'vocabularies',
  {
    id: serial('id').primaryKey(),

    word: varchar('word', { length: 255 }).notNull(),

    meaning: varchar('meaning', { length: 255 }).notNull(),

    lessonId: integer('lesson_id')
      .notNull()
      .references(() => lessons.id),

    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    uniqueWordPerLesson: uniqueIndex('vocabularies_lesson_word_uniq').on(
      table.lessonId,
      table.word,
    ),

    lessonIdx: index('vocabularies_lesson_idx').on(table.lessonId),
  }),
);
