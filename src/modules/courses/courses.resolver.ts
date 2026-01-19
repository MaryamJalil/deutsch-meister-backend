import { Args, Mutation, Resolver } from '@nestjs/graphql/dist/index.js';
import { Course } from './course.model.js';
import { CourseService } from './courses.service.js';
import { CreateCourseInput } from '../auth/dto/course.input.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard.js';

@Resolver()
export class CoursesResolver {
  constructor(private coursesService: CourseService) {}

  @Mutation(() => Course)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createCourse(@Args('input') input: CreateCourseInput): Promise<Course> {
    console.log('CREATE COURSE:', input);
    const course = await this.coursesService.createCourse(
      input.title,
      input.language,
    );
    return course;
  }
}
