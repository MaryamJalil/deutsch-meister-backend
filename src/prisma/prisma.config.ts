import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';

export const getPrismaOptions = (config: ConfigService) => {
  const databaseUrl = config.get<string>('DATABASE_URL');

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined');
  }

  return {
    datasources: {
      db: { url: databaseUrl },
    },
    log: [
      { level: 'query', emit: 'stdout' },
      { level: 'info', emit: 'stdout' },
      { level: 'warn', emit: 'stdout' },
      { level: 'error', emit: 'stdout' },
    ] as Prisma.LogDefinition[],
  };
};
