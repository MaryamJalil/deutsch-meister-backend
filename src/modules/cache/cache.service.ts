import { Injectable, Logger } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);
  private client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  });

  constructor() {
    this.client.connect();
    this.logger.log('Redis connected');
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttl = 3600) {
    await this.client.set(key, JSON.stringify(value), {
      EX: ttl,
    });
  }

  async delete(key: string) {
    await this.client.del(key);
  }
}
