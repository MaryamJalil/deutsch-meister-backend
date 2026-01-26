import {
  pgTable,
  serial,
  integer,
  timestamp,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { levelNameEnum } from './enums.js';
import { courses } from './course.schema.js';
export const levels = pgTable(
  'levels',
  {
    id: serial('id').primaryKey(),

    code: levelNameEnum('code').notNull(),

    position: integer('position').notNull(),

    courseId: integer('course_id')
      .notNull()
      .references(() => courses.id, { onDelete: 'cascade' }),

    createdAt: timestamp('created_at').notNull().defaultNow(),

    deletedAt: timestamp('deleted_at'),
  },
  (table) => ({
    uniqueLevelPerCourse: uniqueIndex('levels_course_code_deleted_at_uniq').on(
      table.courseId,
      table.code,
      table.deletedAt,
    ),

    courseIdx: index('levels_course_idx').on(table.courseId),

    coursePositionIdx: index('levels_course_position_idx').on(
      table.courseId,
      table.position,
    ),
  }),
);
