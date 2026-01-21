import {
  Args,
  Mutation,
  Resolver,
  Query,
  Int,
} from '@nestjs/graphql/dist/index.js';
import { Course } from './course.model.js';
import { CourseService } from './courses.service.js';
import {
  CreateCourseInput,
  UpdateCourseInput,
} from '../auth/dto/course.input.js';
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
    const course = await this.coursesService.createCourse(
      input.title,
      input.language,
    );
    return course;
  }

  @Mutation(() => Course)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN')
  updateCourse(@Args('input') input: UpdateCourseInput) {
    return this.coursesService.updateCourse(input);
  }
  @Query(() => [Course], { name: 'courses' })
  async getCourses() {
    return this.coursesService.getCourses();
  }
  @Query(() => Course, { name: 'course' })
  async getCourse(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.getCourse(id);
  }
}
