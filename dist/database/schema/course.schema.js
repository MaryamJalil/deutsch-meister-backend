"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courses = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.courses = (0, pg_core_1.pgTable)('courses', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.varchar)('title', { length: 255 }).notNull(),
    language: (0, pg_core_1.varchar)('language', { length: 50 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    deletedAt: (0, pg_core_1.timestamp)('deleted_at'),
}, (table) => ({
    deletedAtIdx: (0, pg_core_1.index)('courses_deleted_at_idx').on(table.deletedAt),
}));
