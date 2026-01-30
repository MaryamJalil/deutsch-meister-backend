"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modules = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const level_schema_1 = require("./level.schema");
exports.modules = (0, pg_core_1.pgTable)('modules', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.varchar)('title', { length: 255 }).notNull(),
    order: (0, pg_core_1.integer)('order').notNull(),
    levelId: (0, pg_core_1.integer)('level_id')
        .notNull()
        .references(() => level_schema_1.levels.id),
    deletedAt: (0, pg_core_1.timestamp)('deleted_at'),
}, (table) => ({
    levelIdx: (0, pg_core_1.index)('modules_level_idx').on(table.levelId),
}));
