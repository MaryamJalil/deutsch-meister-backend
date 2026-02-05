import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { Vocabulary } from './vocabulary.model';
import { VocabularyService } from './vocabulary.service';
import {
  CreateVocabularyInput,
  UpdateVocabularyInput,
} from '../auth/dto/vocabulary.input';

@Resolver(() => Vocabulary)
export class VocabularyResolver {
  constructor(private vocabularyService: VocabularyService) {}
  @Mutation(() => Vocabulary)
  async createVocabulary(
    @Args('input') input: CreateVocabularyInput,
  ): Promise<Vocabulary> {
    return this.vocabularyService.createVocabulary(input);
  }

  @Mutation(() => Vocabulary)
  async updateVocabulary(
    @Args('input') input: UpdateVocabularyInput,
  ): Promise<Vocabulary> {
    return this.vocabularyService.updateVocabulary(input);
  }
  @Query(() => [Vocabulary], { name: 'vocabularies' })
  async getVocabularies() {
    return this.vocabularyService.getVocabularies();
  }
  @Query(() => Vocabulary, { name: 'vocabulary' })
  async getVocabulary(@Args('id', { type: () => Int }) id: number) {
    return this.vocabularyService.getVocabulary(id);
  }
  @Query(() => [Vocabulary], { name: 'searchVocabulary' })
  async searchVocabulary(@Args('query') query: string) {
    return this.vocabularyService.searchVocabulary(query);
  }
}
