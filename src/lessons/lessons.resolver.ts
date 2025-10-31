import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { LessonsService } from './lessons.service';
import { LessonModel } from 'src/models/lesson.model';
import { CreateLessonInput, UpdateLessonInput } from './lesson.input';

@Resolver()
export class LessonsResolver {
  constructor(private readonly lessonService: LessonsService) {}

  @Mutation(() => LessonModel)
  async createLesson(@Args('input') input: CreateLessonInput) {
    return this.lessonService.createLesson(input);
  }

  @Mutation(() => LessonModel)
  async updateLesson(@Args('input') input: UpdateLessonInput) {
    return this.lessonService.updateLesson(input);
  }

  @Query(() => [LessonModel])
  async lessons() {
    return this.lessonService.findAlllessons();
  }

  @Query(() => LessonModel, { nullable: true })
  async levelById(@Args('id', { type: () => Int }) id: number) {
    return this.lessonService.findLessonById(id);
  }
}
