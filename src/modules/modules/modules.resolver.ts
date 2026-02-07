import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ModuleService } from './modules.service';
import { Module } from './module.model';
import {
  CreateModuleInput,
  UpdateModuleInput,
} from '../auth/dto/modules.input';

@Resolver()
export class ModulesResolver {
  constructor(private moduleService: ModuleService) {}
  @Mutation(() => Module)
  async createModule(@Args('input') input: CreateModuleInput) {
    return this.moduleService.createModule(input);
  }
  @Mutation(() => Module)
  async updateModule(@Args('input') input: UpdateModuleInput) {
    return this.moduleService.updateeModule(input);
  }
  @Query(() => [Module], { name: 'modules' })
  async getLessons() {
    return this.moduleService.getModules();
  }
  @Query(() => Module, { name: 'module' })
  async getLesson(@Args('id', { type: () => Int }) id: number) {
    return this.moduleService.getModule(id);
  }
}
