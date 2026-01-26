import { Module } from '@nestjs/common';
import { LevelService } from './level.service.js';
import { LevelResolver } from './level.resolver.js';

@Module({
  imports: [],
  providers: [LevelService, LevelResolver],
})
export class LevelModule {}
