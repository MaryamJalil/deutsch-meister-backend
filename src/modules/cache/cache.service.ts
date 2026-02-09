import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CacheService.name);
  private client: RedisClientType;
  private connected = false;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    }) as RedisClientType;

    this.client.on('error', (err) => {
      this.logger.warn('Redis client error', err);
      this.connected = false;
    });

    this.client.on('connect', () => {
      this.logger.log('Redis connected');
      this.connected = true;
    });
  }

  async onModuleInit() {
    try {
      await this.client.connect();
    } catch (error) {
      this.logger.warn('Redis connection failed, caching disabled', error);
    }
  }

  async onModuleDestroy() {
    if (this.connected) {
      await this.client.quit();
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.connected) return null;
    try {
      const data = await this.client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      this.logger.warn(`Cache get failed for key: ${key}`, error);
      return null;
    }
  }

  async set(key: string, value: unknown, ttl = 3600): Promise<void> {
    if (!this.connected) return;
    try {
      await this.client.set(key, JSON.stringify(value), { EX: ttl });
    } catch (error) {
      this.logger.warn(`Cache set failed for key: ${key}`, error);
    }
  }

  async delete(key: string): Promise<void> {
    if (!this.connected) return;
    try {
      await this.client.del(key);
    } catch (error) {
      this.logger.warn(`Cache delete failed for key: ${key}`, error);
    }
  }
}
