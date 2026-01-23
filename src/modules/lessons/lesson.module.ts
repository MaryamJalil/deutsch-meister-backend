import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { LessonService } from './lesson.service.js';
import { LessonResolver } from './lesson.resolver.js';

@Module({
  imports: [PrismaModule],
  providers: [LessonService, LessonResolver],
})
export class LessonModule {}
