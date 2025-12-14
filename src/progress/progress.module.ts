import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { ProgressService } from './progress.service.js';
import { ProgressResolver } from './progress.resolver.js';

@Module({
  imports: [PrismaModule],
  providers: [ProgressResolver, ProgressService],
})
export class ProgressModule {}
