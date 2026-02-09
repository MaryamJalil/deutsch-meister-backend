import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { Vocabulary } from './vocabulary.model';
import { VocabularyService } from './vocabulary.service';
import {
  CreateVocabularyInput,
  UpdateVocabularyInput,
} from '../auth/dto/vocabulary.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => Vocabulary)
export class VocabularyResolver {
  constructor(private vocabularyService: VocabularyService) {}

  @Mutation(() => Vocabulary)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN', 'TEACHER')
  async createVocabulary(
    @Args('input') input: CreateVocabularyInput,
  ): Promise<Vocabulary> {
    return this.vocabularyService.createVocabulary(input);
  }

  @Mutation(() => Vocabulary)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN', 'TEACHER')
  async updateVocabulary(
    @Args('input') input: UpdateVocabularyInput,
  ): Promise<Vocabulary> {
    return this.vocabularyService.updateVocabulary(input);
  }

  @Mutation(() => Vocabulary)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteVocabulary(@Args('id', { type: () => Int }) id: number) {
    return this.vocabularyService.deleteVocabulary(id);
  }

  @Query(() => [Vocabulary], { name: 'vocabularies' })
  async getVocabularies() {
    return this.vocabularyService.getVocabularies();
  }

  @Query(() => Vocabulary, { name: 'vocabulary', nullable: true })
  async getVocabulary(@Args('id', { type: () => Int }) id: number) {
    return this.vocabularyService.getVocabulary(id);
  }

  @Query(() => [Vocabulary], { name: 'vocabularyByLesson' })
  async getVocabularyByLesson(
    @Args('lessonId', { type: () => Int }) lessonId: number,
  ) {
    return this.vocabularyService.getVocabularyByLesson(lessonId);
  }

  @Query(() => [Vocabulary], { name: 'searchVocabulary' })
  async searchVocabulary(@Args('query') query: string) {
    return this.vocabularyService.searchVocabulary(query);
  }
}
