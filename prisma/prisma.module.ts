import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global() // ✅ Makes PrismaService available everywhere without reimporting
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
