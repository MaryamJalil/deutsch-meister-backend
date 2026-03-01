import { pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['ADMIN', 'STUDENT', 'TEACHER']);

export const levelNameEnum = pgEnum('level_name', [
  'A1',
  'A2',
  'B1',
  'B2',
  'C1',
  'C2',
]);

export const exerciseTypeEnum = pgEnum('excercise_type', [
  'MULTIPLE_CHOICE',
  'FILL_IN_THE_BLANK',
  'SENTENCE_ORDERING',
  'LISTENING_COMPREHENSION',
]);
