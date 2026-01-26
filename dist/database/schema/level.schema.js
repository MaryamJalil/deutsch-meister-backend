"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levels = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const enums_js_1 = require("./enums.js");
const course_schema_js_1 = require("./course.schema.js");
exports.levels = (0, pg_core_1.pgTable)('levels', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    code: (0, enums_js_1.levelNameEnum)('code').notNull(),
    position: (0, pg_core_1.integer)('position').notNull(),
    courseId: (0, pg_core_1.integer)('course_id')
        .notNull()
        .references(() => course_schema_js_1.courses.id, { onDelete: 'cascade' }),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    deletedAt: (0, pg_core_1.timestamp)('deleted_at'),
}, (table) => ({
    uniqueLevelPerCourse: (0, pg_core_1.uniqueIndex)('levels_course_code_deleted_at_uniq').on(table.courseId, table.code, table.deletedAt),
    courseIdx: (0, pg_core_1.index)('levels_course_idx').on(table.courseId),
    coursePositionIdx: (0, pg_core_1.index)('levels_course_position_idx').on(table.courseId, table.position),
}));
