import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AIContentGeneratorService } from './ai-content-generator.service.js';
import { AITutorService } from './ai-tutor.service.js';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Vocabulary } from '../vocabulary/vocabulary.model.js';

@InputType()
class GenerateVocabularyInputType {
  @Field() topic!: string;
  @Field() level!: string;
  @Field() count!: number;
  @Field() targetLanguage!: string;
  @Field() sourceLanguage!: string;
}

@Resolver()
export class AIResolver {
  constructor(
    private readonly generator: AIContentGeneratorService,
    private readonly tutor: AITutorService,
  ) {}

  @Mutation(() => [Vocabulary])
  async generateVocabulary(@Args('input') input: GenerateVocabularyInputType) {
    return this.generator.generateVocabulary(input);
  }

  @Query(() => String)
  async askTutor(@Args('message') message: string) {
    const response = await this.tutor.chat(message);
    return response.message;
  }
}
