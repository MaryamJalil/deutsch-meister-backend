import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { LevelService } from './level.service.js';
import { LevelResolver } from './level.resolver.js';

@Module({
  imports: [PrismaModule],
  providers: [LevelService, LevelResolver],
})
export class LevelModule {}
