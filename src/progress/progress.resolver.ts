import { Args, Context, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { ProgressService } from './progress.service';
import { ProgressModel } from 'src/models/progress.model';
import { CreateProgressInput, UpdateProgressInput } from './progress.input';
import { CurrentUserId } from 'src/users/user.decorator';

@Resolver()
export class ProgressResolver {
  constructor(private readonly progressService: ProgressService) {}

  @Mutation(() => ProgressModel)
  async createProgress(
    @Args('input') input: CreateProgressInput,
    @CurrentUserId() userId: number,
  ) {
    console.log(userId, 'userId');
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
}
