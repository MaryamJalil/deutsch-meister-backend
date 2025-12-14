import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CourseModel } from '../models/course.model.js';
import { CourseService } from './course.service.js';
import { CreateCourseInput } from './create-course.input.js';


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

  @Query(() => CourseModel, { nullable: true })
  async courseByLevel(@Args('slug') slug: string) {
    return this.courseService.getCourseByLevel(slug);
  }
}
