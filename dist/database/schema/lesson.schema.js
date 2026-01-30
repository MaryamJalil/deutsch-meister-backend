"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessons = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const level_schema_1 = require("./level.schema");
const module_schema_1 = require("./module.schema");
exports.lessons = (0, pg_core_1.pgTable)('lessons', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.varchar)('title', { length: 255 }).notNull(),
    description: (0, pg_core_1.text)('description'),
    content: (0, pg_core_1.text)('content').notNull(),
    order: (0, pg_core_1.integer)('order').notNull(),
    levelId: (0, pg_core_1.integer)('level_id')
        .notNull()
        .references(() => level_schema_1.levels.id),
    moduleId: (0, pg_core_1.integer)('module_id').references(() => module_schema_1.modules.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
}, (table) => ({
    uniqueLessonOrder: (0, pg_core_1.uniqueIndex)('lessons_level_order_uniq').on(table.levelId, table.order),
    levelIdx: (0, pg_core_1.index)('lessons_level_idx').on(table.levelId),
}));
