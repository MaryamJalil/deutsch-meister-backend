import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelResolver } from './level.resolver';

@Module({
  imports: [],
  providers: [LevelService, LevelResolver],
})
export class LevelModule {}
