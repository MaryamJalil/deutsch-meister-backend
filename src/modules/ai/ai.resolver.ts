import { Resolver, Mutation, Args, Query, Int, ObjectType, Field, InputType } from '@nestjs/graphql';
import { AIContentGeneratorService } from './ai-content-generator.service';
import { AITutorService } from './ai-tutor.service';

@ObjectType()
class GeneratedVocabularyItem {
  @Field() word!: string;
  @Field() meaning!: string;
  @Field({ nullable: true }) partOfSpeech?: string;
  @Field({ nullable: true }) example?: string;
}

@ObjectType()
class GeneratedExampleSentence {
  @Field() sentence!: string;
  @Field() translation!: string;
  @Field({ nullable: true }) context?: string;
}

@ObjectType()
class TutorResponse {
  @Field() message!: string;
  @Field(() => [String], { nullable: true }) relatedLessons?: string[];
}

@ObjectType()
class TranslationResponse {
  @Field() translation!: string;
  @Field() explanation!: string;
  @Field(() => [String], { nullable: true }) breakdown?: string[];
}

@InputType()
class GenerateVocabularyInput {
  @Field() topic!: string;
  @Field() level!: string;
  @Field(() => Int) count!: number;
  @Field() targetLanguage!: string;
  @Field() sourceLanguage!: string;
}

@InputType()
class GenerateExamplesInput {
  @Field() word!: string;
  @Field() level!: string;
  @Field(() => Int) count!: number;
  @Field() targetLanguage!: string;
  @Field() sourceLanguage!: string;
}

@Resolver()
export class AIResolver {
  constructor(
    private readonly generator: AIContentGeneratorService,
    private readonly tutor: AITutorService,
  ) {}

  @Mutation(() => [GeneratedVocabularyItem])
  async generateVocabulary(@Args('input') input: GenerateVocabularyInput) {
    return this.generator.generateVocabulary(input);
  }

  @Mutation(() => [GeneratedExampleSentence])
  async generateExamples(@Args('input') input: GenerateExamplesInput) {
    return this.generator.generateExamples(input);
  }

  @Query(() => TutorResponse)
  async askTutor(@Args('message') message: string) {
    return this.tutor.chat(message);
  }

  @Query(() => String)
  async explainGrammar(
    @Args('concept') concept: string,
    @Args('level') level: string,
    @Args('targetLanguage', { defaultValue: 'German' }) targetLanguage: string,
    @Args('sourceLanguage', { defaultValue: 'English' }) sourceLanguage: string,
  ) {
    return this.generator.explainGrammar(concept, level, targetLanguage, sourceLanguage);
  }

  @Query(() => TranslationResponse)
  async translateWithExplanation(
    @Args('text') text: string,
    @Args('sourceLanguage') sourceLanguage: string,
    @Args('targetLanguage') targetLanguage: string,
    @Args('level', { defaultValue: 'A1' }) level: string,
  ) {
    return this.generator.translateWithExplanation(text, sourceLanguage, targetLanguage, level);
  }
}
