"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const enums_1 = require("./enums");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).notNull().unique(),
    password: (0, pg_core_1.varchar)('password', { length: 255 }).notNull(),
    role: (0, enums_1.roleEnum)('role').notNull().default('STUDENT'),
    refreshToken: (0, pg_core_1.varchar)('refresh_token', { length: 255 }),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
