import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ModuleService } from './modules.service';
import { Module } from './module.model';
import { CreateModuleInput, UpdateModuleInput } from '../auth/dto/modules.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => Module)
export class ModulesResolver {
  constructor(private moduleService: ModuleService) {}

  @Mutation(() => Module)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN', 'TEACHER')
  async createModule(@Args('input') input: CreateModuleInput) {
    return this.moduleService.createModule(input);
  }

  @Mutation(() => Module)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN', 'TEACHER')
  async updateModule(@Args('input') input: UpdateModuleInput) {
    return this.moduleService.updateModule(input);
  }

  @Mutation(() => Module)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteModule(@Args('id', { type: () => Int }) id: number) {
    return this.moduleService.deleteModule(id);
  }

  @Query(() => [Module], { name: 'modules' })
  async getModules() {
    return this.moduleService.getModules();
  }

  @Query(() => Module, { name: 'module', nullable: true })
  async getModule(@Args('id', { type: () => Int }) id: number) {
    return this.moduleService.getModule(id);
  }

  @Query(() => [Module], { name: 'modulesByLevel' })
  async getModulesByLevel(
    @Args('levelId', { type: () => Int }) levelId: number,
  ) {
    return this.moduleService.getModulesByLevel(levelId);
  }
}
