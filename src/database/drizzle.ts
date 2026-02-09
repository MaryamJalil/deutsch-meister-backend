import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as userSchema from './schema/user.schema';
import * as courseSchema from './schema/course.schema';
import * as levelSchema from './schema/level.schema';
import * as moduleSchema from './schema/module.schema';
import * as lessonSchema from './schema/lesson.schema';
import * as vocabularySchema from './schema/vocabulary.schema';
import * as exampleSchema from './schema/example.schema';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const allSchemas = {
  ...userSchema,
  ...courseSchema,
  ...levelSchema,
  ...moduleSchema,
  ...lessonSchema,
  ...vocabularySchema,
  ...exampleSchema,
};

export const db = drizzle(pool, { schema: allSchemas });
