import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { lessons } from './lesson.schema.js';

export const examples = pgTable(
  'examples',
  {
    id: serial('id').primaryKey(),

    sentence: text('sentence').notNull(),

    translation: text('translation').notNull(),

    lessonId: integer('lesson_id')
      .notNull()
      .references(() => lessons.id),

    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    lessonIdx: index('examples_lesson_idx').on(table.lessonId),
  }),
);
