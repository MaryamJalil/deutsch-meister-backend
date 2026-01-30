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
