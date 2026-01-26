import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';
import { roleEnum } from './enums.js';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),

  email: varchar('email', { length: 255 }).notNull().unique(),

  password: varchar('password', { length: 255 }).notNull(),

  role: roleEnum('role').notNull().default('STUDENT'),

  refreshToken: varchar('refresh_token', { length: 255 }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
});
