import { Module } from '@nestjs/common';
import { LessonsResolver } from './lessons.resolver';
import { LessonsService } from './lessons.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LessonsResolver, LessonsService]
})
export class LessonsModule {}
