import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /**
   * Initializes the Prisma Client when the module starts.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Gracefully shuts down the Prisma Client when the app closes.
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Optionally enables clean shutdown hooks for specific Nest application instances.
   */
  async enableShutdownHooks(app: any) {
    // Use type assertion to bypass the type check
    (this as any).$on('beforeExit', async () => {
      await app.close();
    });
  }
}
