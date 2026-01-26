import { Module } from '@nestjs/common';
import { CourseService } from './courses.service.js';
import { CoursesResolver } from './courses.resolver.js';

@Module({
  imports: [],
  providers: [CourseService, CoursesResolver],
})
export class CoursesModule {}
