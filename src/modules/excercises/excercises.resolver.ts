import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ExcercisesService } from './excercises/excercises.service';
import {
  Exercise,
  GenerateExercisesInput,
} from './excercises/excercises.model';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Resolver()
export class ExercisesResolver {
  constructor(private readonly exercisesService: ExcercisesService) {}

  @Mutation(() => [Exercise])
  //   @UseGuards(GqlAuthGuard, RolesGuard)
  //   @Roles('ADMIN', 'TEACHER')
  async generateExercises(
    @Args('input') input: GenerateExercisesInput,
  ): Promise<Exercise[]> {
    return this.exercisesService.generateExercises(input) as any;
  }
}
