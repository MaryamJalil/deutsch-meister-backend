import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExampleService } from './example.service';
import { Example } from './example.model';
import {
  CreateExampleInput,
  UpdateExampleInput,
} from '../auth/dto/example.input';

@Resolver()
export class ExampleResolver {
  constructor(private exampleService: ExampleService) {}

  @Mutation(() => Example)
  async createExample(@Args('input') input: CreateExampleInput) {
    return this.exampleService.createExample(input);
  }

  @Mutation(() => Example)
  async updateExample(@Args('input') input: UpdateExampleInput) {
    return this.exampleService.updateExample(input);
  }

  @Mutation(() => Example)
  async deleteExample(@Args('id') id: number) {
    return this.exampleService.deleteExample(id);
  }
  @Query(() => [Example], { name: 'examples' })
  async getLessons() {
    return this.exampleService.getExamples();
  }
  @Query(() => Example, { name: 'example' })
  async getLesson(@Args('id', { type: () => Int }) id: number) {
    return this.exampleService.getExample(id);
  }
}
