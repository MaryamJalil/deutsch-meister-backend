"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userExerciseAttempts = exports.exercises = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const lesson_schema_1 = require("./lesson.schema");
const user_schema_1 = require("./user.schema");
const enums_1 = require("./enums");
exports.exercises = (0, pg_core_1.pgTable)('exercises', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    lessonId: (0, pg_core_1.integer)('lesson_id')
        .notNull()
        .references(() => lesson_schema_1.lessons.id, { onDelete: 'cascade' }),
    type: (0, enums_1.exerciseTypeEnum)('type').notNull(),
    question: (0, pg_core_1.text)('question').notNull(),
    audioUrl: (0, pg_core_1.varchar)('audio_url', { length: 500 }),
    targetAnswer: (0, pg_core_1.text)('target_answer').notNull(),
    explanation: (0, pg_core_1.text)('explanation'),
    // Type-specific payload: options[], parts[], etc.
    metadata: (0, pg_core_1.jsonb)('metadata').$type(),
    generatedByAi: (0, pg_core_1.boolean)('generated_by_ai').notNull().default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
}, (table) => ({
    lessonIdx: (0, pg_core_1.index)('exercises_lesson_idx').on(table.lessonId),
    typeIdx: (0, pg_core_1.index)('exercises_type_idx').on(table.type),
}));
exports.userExerciseAttempts = (0, pg_core_1.pgTable)('user_exercise_attempts', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.integer)('user_id')
        .notNull()
        .references(() => user_schema_1.users.id, { onDelete: 'cascade' }),
    exerciseId: (0, pg_core_1.integer)('exercise_id')
        .notNull()
        .references(() => exports.exercises.id, { onDelete: 'cascade' }),
    userAnswer: (0, pg_core_1.text)('user_answer').notNull(),
    isCorrect: (0, pg_core_1.boolean)('is_correct').notNull(),
    score: (0, pg_core_1.integer)('score').notNull().default(0),
    timeSpentSeconds: (0, pg_core_1.integer)('time_spent_seconds').notNull().default(0),
    feedback: (0, pg_core_1.text)('feedback'),
    attemptedAt: (0, pg_core_1.timestamp)('attempted_at').notNull().defaultNow(),
}, (table) => ({
    userIdx: (0, pg_core_1.index)('attempts_user_idx').on(table.userId),
    exerciseIdx: (0, pg_core_1.index)('attempts_exercise_idx').on(table.exerciseId),
    userExerciseIdx: (0, pg_core_1.index)('attempts_user_exercise_idx').on(table.userId, table.exerciseId),
}));
