import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { LevelService } from './level.service';
import { LevelModel } from 'src/models/level.model';
import { CreateLevelInput, UpdateLevelInput } from './level.input';

@Resolver()
export class LevelResolver {
  constructor(private readonly levelService: LevelService) {}

  @Mutation(() => LevelModel)
  async createLevel(@Args('input') input: CreateLevelInput) {
    return this.levelService.createLevel(input);
  }
  @Mutation(() => LevelModel)
  async updateLevel(@Args('input') input: UpdateLevelInput) {
    return this.levelService.updateLevel(input);
  }

  @Query(() => [LevelModel])
  async levels() {
    return this.levelService.findAllLevels();
  }

  @Query(() => LevelModel, { nullable: true })
  async levelById(@Args('id', { type: () => Int }) id: number) {
    return this.levelService.findLevelById(id);
  }
}
