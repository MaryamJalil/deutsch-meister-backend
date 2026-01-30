import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Lesson } from './lesson.model.js';
import { CreateLessonInput } from '../auth/dto/lesson.input.js';
import { LessonService } from './lesson.service.js';

@Resolver()
export class LessonResolver {
  constructor(private lessonService: LessonService) {}
  @Mutation(() => Lesson)
  createLessonAtPosition(
    @Args('input') input: CreateLessonInput,
  ): Promise<any> {
    return this.lessonService.createLessonAtPosition(
      input.title,
      input.order,
      input.levelId,
      input.description,
      input.content,
    );
  }
}
