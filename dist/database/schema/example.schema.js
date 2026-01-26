"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.examples = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const lesson_schema_js_1 = require("./lesson.schema.js");
exports.examples = (0, pg_core_1.pgTable)('examples', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    sentence: (0, pg_core_1.text)('sentence').notNull(),
    translation: (0, pg_core_1.text)('translation').notNull(),
    lessonId: (0, pg_core_1.integer)('lesson_id')
        .notNull()
        .references(() => lesson_schema_js_1.lessons.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
}, (table) => ({
    lessonIdx: (0, pg_core_1.index)('examples_lesson_idx').on(table.lessonId),
}));
