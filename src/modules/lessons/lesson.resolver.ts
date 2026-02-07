import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Lesson } from './lesson.model.js';
import {
  CreateLessonInput,
  UpdateLessonInput,
} from '../auth/dto/lesson.input.js';
import { LessonService } from './lesson.service.js';

@Resolver()
export class LessonResolver {
  constructor(private lessonService: LessonService) {}
  @Mutation(() => Lesson)
  async createLesson(@Args('input') input: CreateLessonInput): Promise<Lesson> {
    return this.lessonService.createLesson(input);
  }
  @Mutation(() => Lesson)
  async updateLesson(@Args('input') input: UpdateLessonInput): Promise<Lesson> {
    return this.lessonService.updateLesson(input);
  }

  @Query(() => [Lesson], { name: 'lessons' })
  async getLessons() {
    return this.lessonService.getLessons();
  }
  @Query(() => Lesson, { name: 'lesson' })
  async getLesson(@Args('id', { type: () => Int }) id: number) {
    return this.lessonService.getLesson(id);
  }
}
