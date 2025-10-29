import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { CourseModel } from './course.model';
import { CreateCourseInput } from './create-course.input';

@Resolver(() => CourseModel)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => CourseModel)
  async createCourse(@Args('input') input: CreateCourseInput) {
    return this.courseService.createCourse(input);
  }

  @Query(() => [CourseModel])
  async courses() {
    return this.courseService.findCourses();
  }

  @Query(() => CourseModel, { nullable: true })
  async courseById(@Args('id', { type: () => Int }) id: number) {
    return this.courseService.findCourseById(id);
  }
}
