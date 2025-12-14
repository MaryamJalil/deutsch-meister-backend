import { Args, Context, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { ProgressModel } from '../models/progress.model.js';
import { CreateProgressInput, UpdateProgressInput } from './progress.input.js';
import { CurrentUserId } from '../users/user.decorator.js';
import { ProgressService } from './progress.service.js';

@Resolver()
export class ProgressResolver {
  constructor(private readonly progressService: ProgressService) {}

  @Mutation(() => ProgressModel)
  async createProgress(
    @Args('input') input: CreateProgressInput,
    @CurrentUserId() userId: number,
  ) {
    if (!userId) throw new Error('User not authorized');
    return this.progressService.createProgress(input, userId);
  }

  @Mutation(() => ProgressModel)
  async updateProgress(@Args('input') input: UpdateProgressInput) {
    return this.progressService.updateLesson(input);
  }
  @Query(() => [ProgressModel])
  async progresses() {
    return this.progressService.findProgress();
  }

  @Query(() => ProgressModel, { nullable: true })
  async progressById(@Args('id', { type: () => Int }) id: number) {
    return this.progressService.findProgressById(id);
  }

    @Query(() => ProgressModel, { nullable: true })
  async progressByCourse(@Args('courseId', { type: () => Int }) courseId: number) {
    return this.progressService.findProgressByCourseId(courseId);
  }
  
}
