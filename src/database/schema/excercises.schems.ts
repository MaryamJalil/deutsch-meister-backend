import {
  pgTable,
  serial,
  integer,
  text,
  boolean,
  jsonb,
  timestamp,
  index,
  varchar,
} from 'drizzle-orm/pg-core';
import { lessons } from './lesson.schema';
import { users } from './user.schema';
import { exerciseTypeEnum } from './enums';

export const exercises = pgTable(
  'exercises',
  {
    id: serial('id').primaryKey(),

    lessonId: integer('lesson_id')
      .notNull()
      .references(() => lessons.id, { onDelete: 'cascade' }),

    type: exerciseTypeEnum('type').notNull(),

    question: text('question').notNull(),

    audioUrl: varchar('audio_url', { length: 500 }),

    targetAnswer: text('target_answer').notNull(),

    explanation: text('explanation'),

    // Type-specific payload: options[], parts[], etc.
    metadata: jsonb('metadata').$type<Record<string, unknown>>(),

    generatedByAi: boolean('generated_by_ai').notNull().default(true),

    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    lessonIdx: index('exercises_lesson_idx').on(table.lessonId),
    typeIdx: index('exercises_type_idx').on(table.type),
  }),
);

export const userExerciseAttempts = pgTable(
  'user_exercise_attempts',
  {
    id: serial('id').primaryKey(),

    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),

    exerciseId: integer('exercise_id')
      .notNull()
      .references(() => exercises.id, { onDelete: 'cascade' }),

    userAnswer: text('user_answer').notNull(),

    isCorrect: boolean('is_correct').notNull(),

    score: integer('score').notNull().default(0),

    timeSpentSeconds: integer('time_spent_seconds').notNull().default(0),

    feedback: text('feedback'),

    attemptedAt: timestamp('attempted_at').notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index('attempts_user_idx').on(table.userId),
    exerciseIdx: index('attempts_exercise_idx').on(table.exerciseId),
    userExerciseIdx: index('attempts_user_exercise_idx').on(
      table.userId,
      table.exerciseId,
    ),
  }),
);
