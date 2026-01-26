import {
  pgTable,
  serial,
  varchar,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';

export const courses = pgTable(
  'courses',
  {
    id: serial('id').primaryKey(),

    title: varchar('title', { length: 255 }).notNull(),

    language: varchar('language', { length: 50 }).notNull(),

    createdAt: timestamp('created_at').notNull().defaultNow(),

    deletedAt: timestamp('deleted_at'),
  },
  (table) => ({
    deletedAtIdx: index('courses_deleted_at_idx').on(table.deletedAt),
  }),
);
