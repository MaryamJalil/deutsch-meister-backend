import { envSchema } from './env.schema';

export const configuration = () => {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error(parsed.error.format());
    throw new Error('Invalid environment variables');
  }
  return parsed.data;
};
