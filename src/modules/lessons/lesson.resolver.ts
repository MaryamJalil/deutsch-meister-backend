import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Lesson } from './lesson.model';
import { CreateLessonInput, UpdateLessonInput } from '../auth/dto/lesson.input';
import { LessonService } from './lesson.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => Lesson)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @Mutation(() => Lesson)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN', 'TEACHER')
  async createLesson(@Args('input') input: CreateLessonInput): Promise<Lesson> {
    return this.lessonService.createLesson(input);
  }

  @Mutation(() => Lesson)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN', 'TEACHER')
  async updateLesson(@Args('input') input: UpdateLessonInput): Promise<Lesson> {
    return this.lessonService.updateLesson(input);
  }

  @Mutation(() => Lesson)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteLesson(@Args('id', { type: () => Int }) id: number) {
    return this.lessonService.deleteLesson(id);
  }

  @Query(() => [Lesson], { name: 'lessons' })
  async getLessons() {
    return this.lessonService.getLessons();
  }

  @Query(() => Lesson, { name: 'lesson', nullable: true })
  async getLesson(@Args('id', { type: () => Int }) id: number) {
    return this.lessonService.getLesson(id);
  }

  @Query(() => [Lesson], { name: 'lessonsByLevel' })
  async getLessonsByLevel(
    @Args('levelId', { type: () => Int }) levelId: number,
  ) {
    return this.lessonService.getLessonsByLevel(levelId);
  }

  @Query(() => [Lesson], { name: 'lessonsByModule' })
  async getLessonsByModule(
    @Args('moduleId', { type: () => Int }) moduleId: number,
  ) {
    return this.lessonService.getLessonsByModule(moduleId);
  }
}
