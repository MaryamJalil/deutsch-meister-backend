import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import { ConfigModule } from '@nestjs/config/index.js';

@Global()
@Module({
    imports: [ConfigModule], // <-- make ConfigService available

  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
