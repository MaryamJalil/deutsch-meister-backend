import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { CourseService } from './courses.service.js';
import { CoursesResolver } from './courses.resolver.js';

@Module({
  imports: [PrismaModule],
  providers: [CourseService, CoursesResolver],
})
export class CoursesModule {}
