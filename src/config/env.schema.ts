import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number(),
  DATABASE_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(1).optional(),
  JWT_REFRESH_SECRET: z.string().min(1).optional(),
  GROQ_API_KEY: z.string().min(1).optional(),
  REDIS_URL: z.string().optional(),
});

export type EnvVars = z.infer<typeof envSchema>;
