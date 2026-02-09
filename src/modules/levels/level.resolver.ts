import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { Level } from './level.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { LevelService } from './level.service';
import { CreateLevelInput, UpdateLevelInput } from '../auth/dto/levels.input';

@Resolver(() => Level)
export class LevelResolver {
  constructor(private levelService: LevelService) {}

  @Mutation(() => Level)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN', 'TEACHER')
  createLevel(@Args('input') input: CreateLevelInput) {
    return this.levelService.createLevel(input);
  }

  @Mutation(() => Level)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN', 'TEACHER')
  updateLevel(@Args('input') input: UpdateLevelInput) {
    return this.levelService.updateLevel(input);
  }

  @Mutation(() => Level)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN')
  deleteLevel(@Args('id', { type: () => Int }) id: number) {
    return this.levelService.deleteLevel(id);
  }

  @Query(() => [Level], { name: 'levels' })
  async getLevels() {
    return this.levelService.getLevels();
  }

  @Query(() => Level, { name: 'level', nullable: true })
  async getLevel(@Args('id', { type: () => Int }) id: number) {
    return this.levelService.getLevel(id);
  }

  @Query(() => [Level], { name: 'levelsByCourse' })
  async getLevelsByCourse(
    @Args('courseId', { type: () => Int }) courseId: number,
  ) {
    return this.levelService.getLevelsByCourse(courseId);
  }
}
