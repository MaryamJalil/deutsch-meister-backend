import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExampleService } from './example.service';
import { Example } from './example.model';
import {
  CreateExampleInput,
  UpdateExampleInput,
} from '../auth/dto/example.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => Example)
export class ExampleResolver {
  constructor(private exampleService: ExampleService) {}

  @Mutation(() => Example)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN', 'TEACHER')
  async createExample(@Args('input') input: CreateExampleInput) {
    return this.exampleService.createExample(input);
  }

  @Mutation(() => Example)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN', 'TEACHER')
  async updateExample(@Args('input') input: UpdateExampleInput) {
    return this.exampleService.updateExample(input);
  }

  @Mutation(() => Example)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteExample(@Args('id', { type: () => Int }) id: number) {
    return this.exampleService.deleteExample(id);
  }

  @Query(() => [Example], { name: 'examples' })
  async getExamples() {
    return this.exampleService.getExamples();
  }

  @Query(() => Example, { name: 'example', nullable: true })
  async getExample(@Args('id', { type: () => Int }) id: number) {
    return this.exampleService.getExample(id);
  }

  @Query(() => [Example], { name: 'examplesByLesson' })
  async getExamplesByLesson(
    @Args('lessonId', { type: () => Int }) lessonId: number,
  ) {
    return this.exampleService.getExamplesByLesson(lessonId);
  }
}
