import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  timestamp,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { levels } from './level.schema';
import { modules } from './module.schema';
import { customType } from 'drizzle-orm/pg-core';

// Use JSON column for embeddings instead of vector
const jsonVector = customType<{ data: number[]; driverData: string }>({
  dataType() {
    return 'jsonb';
  },
});

export const lessons = pgTable(
  'lessons',
  {
    id: serial('id').primaryKey(),

    title: varchar('title', { length: 255 }).notNull(),

    description: text('description'),

    content: text('content').notNull(),

    order: integer('order').notNull(),

    levelId: integer('level_id')
      .notNull()
      .references(() => levels.id),

    moduleId: integer('module_id').references(() => modules.id),

    embedding: jsonVector('embedding'), // store embeddings as JSON

    createdAt: timestamp('created_at').notNull().defaultNow(),

    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    uniqueLessonOrder: uniqueIndex('lessons_level_order_uniq').on(
      table.levelId,
      table.order,
    ),

    levelIdx: index('lessons_level_idx').on(table.levelId),
  }),
);
