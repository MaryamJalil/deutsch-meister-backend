import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { Course } from './course.model';
import { CourseService } from './courses.service';
import { CreateCourseInput, UpdateCourseInput } from '../auth/dto/course.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private coursesService: CourseService) {}

  @Mutation(() => Course)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN', 'TEACHER')
  async createCourse(
    @Args('input') input: CreateCourseInput,
  ): Promise<Course> {
    return this.coursesService.createCourse(input);
  }

  @Mutation(() => Course)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN', 'TEACHER')
  async updateCourse(@Args('input') input: UpdateCourseInput) {
    return this.coursesService.updateCourse(input);
  }

  @Mutation(() => Course)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteCourse(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.deleteCourse(id);
  }

  @Query(() => [Course], { name: 'courses' })
  async getCourses() {
    return this.coursesService.getCourses();
  }

  @Query(() => Course, { name: 'course', nullable: true })
  async getCourse(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.getCourse(id);
  }
}
