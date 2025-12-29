import { Args, Mutation, Resolver, Query, Int, ResolveField, Parent } from '@nestjs/graphql';
import { LessonsService } from './lessons.service';
import { LessonModel } from 'src/models/lesson.model';
import { CreateLessonInput, UpdateLessonInput } from './lesson.input';
import { PrismaService } from '../../prisma/prisma.service';


@Resolver(() => LessonModel)
export class LessonsResolver {
  constructor(
    private readonly lessonService: LessonsService,
    private readonly prisma: PrismaService,
  ) {}

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

  @Query(() => [LessonModel])
  async lessonsByCourse(
    @Args('courseId', { type: () => Int }) courseId: number,
  ): Promise<LessonModel[]> {
    return this.lessonService.getLessonsByCourse(courseId);
  }
}
