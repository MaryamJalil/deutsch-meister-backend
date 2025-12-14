import { Module } from '@nestjs/common';
import { CourseService } from './course.service.js';
import { CourseResolver } from './course.resolver.js';
import { PrismaModule } from '../../prisma/prisma.module.js';


@Module({
  imports: [PrismaModule],
  providers: [CourseResolver, CourseService],
})
export class CourseModule {}
