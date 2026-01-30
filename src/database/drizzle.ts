import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as courseSchema from './schema/course.schema';
import * as lessonSchema from './schema/lesson.schema';
import * as exampleSchema from './schema/example.schema';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Combine all schemas
const allSchemas = {
  ...courseSchema,
  ...lessonSchema,
  ...exampleSchema,
};
export const db = drizzle(pool, { schema: allSchemas });