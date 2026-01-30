"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vocabularies = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const lesson_schema_1 = require("./lesson.schema");
exports.vocabularies = (0, pg_core_1.pgTable)('vocabularies', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    word: (0, pg_core_1.varchar)('word', { length: 255 }).notNull(),
    meaning: (0, pg_core_1.varchar)('meaning', { length: 255 }).notNull(),
    lessonId: (0, pg_core_1.integer)('lesson_id')
        .notNull()
        .references(() => lesson_schema_1.lessons.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
}, (table) => ({
    uniqueWordPerLesson: (0, pg_core_1.uniqueIndex)('vocabularies_lesson_word_uniq').on(table.lessonId, table.word),
    lessonIdx: (0, pg_core_1.index)('vocabularies_lesson_idx').on(table.lessonId),
}));
