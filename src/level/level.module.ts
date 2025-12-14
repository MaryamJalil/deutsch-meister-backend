import { Module } from '@nestjs/common';
import { LevelService } from './level.service.js';
import { LevelResolver } from './level.resolver.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [LevelService, LevelResolver],
})
export class LevelModule {}
