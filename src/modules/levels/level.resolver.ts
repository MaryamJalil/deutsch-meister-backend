import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { Level } from './level.model.js';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { LevelService } from './level.service.js';
import {
  CreateLevelInput,
  UpdateLevelInput,
} from '../auth/dto/levels.input.js';

@Resolver(() => Level)
export class LevelResolver {
  constructor(private levelService: LevelService) {}

  @Mutation(() => Level)
  // @UseGuards(GqlAuthGuard, RolesGuard)
  // @Roles('ADMIN')
  createLevel(@Args('input') input: CreateLevelInput) {
    return this.levelService.createLevel(input);
  }

  @Mutation(() => Level)
  // @UseGuards(GqlAuthGuard, RolesGuard)
  // @Roles('ADMIN')
  updateLevel(@Args('input') input: UpdateLevelInput) {
    return this.levelService.updateLevel(input);
  }
  @Query(() => [Level], { name: 'levels' })
  async getLevels() {
    return this.levelService.getLevels();
  }
  @Query(() => Level, { name: 'level' })
  async getLevel(@Args('id', { type: () => Int }) id: number) {
    return this.levelService.getLevel(id);
  }
}
