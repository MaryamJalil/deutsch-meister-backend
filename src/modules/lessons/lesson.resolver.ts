import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Lesson } from './lesson.model.js';
import { CreateLessonInput } from '../auth/dto/lesson.input.js';
import { LessonService } from './lesson.service.js';

@Resolver()
export class LessonResolver {
  constructor(private lessonService: LessonService) {}
  @Mutation(() => Lesson)
  async createLesson(@Args('input') input: CreateLessonInput): Promise<Lesson> {
    return this.lessonService.createLesson(input);
  }
}
