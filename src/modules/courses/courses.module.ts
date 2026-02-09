import { Module } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CoursesResolver } from './courses.resolver';

@Module({
  imports: [],
  providers: [CourseService, CoursesResolver],
})
export class CoursesModule {}
