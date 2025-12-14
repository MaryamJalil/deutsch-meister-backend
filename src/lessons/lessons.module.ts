import { Module } from '@nestjs/common';
import { LessonsResolver } from './lessons.resolver.js';
import { LessonsService } from './lessons.service.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [LessonsResolver, LessonsService]
})
export class LessonsModule {}
