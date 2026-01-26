import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service.js';
import { LessonResolver } from './lesson.resolver.js';

@Module({
  imports: [],
  providers: [LessonService, LessonResolver],
})
export class LessonModule {}
