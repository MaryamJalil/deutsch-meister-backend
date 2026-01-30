import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { levels } from './level.schema';

export const modules = pgTable(
  'modules',
  {
    id: serial('id').primaryKey(),

    title: varchar('title', { length: 255 }).notNull(),

    order: integer('order').notNull(),

    levelId: integer('level_id')
      .notNull()
      .references(() => levels.id),

    deletedAt: timestamp('deleted_at'),
  },
  (table) => ({
    levelIdx: index('modules_level_idx').on(table.levelId),
  }),
);
