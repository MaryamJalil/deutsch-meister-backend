import {
  Resolver,
  Mutation,
  Args,
  Query,
  Int,
  ObjectType,
  Field,
  InputType,
} from '@nestjs/graphql';
import { AIContentGeneratorService } from './aiContentGenerator.service';
import { AITutorService } from './aiTutor.service';
import { GenerateVocabularyInput } from '../auth/dto/ai.input';

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

@ObjectType()
class LessonSection {
  @Field() title!: string;
  @Field() content!: string;
}

@ObjectType()
class GeneratedLesson {
  @Field() title!: string;
  @Field(() => [String]) objectives!: string[];
  @Field(() => [LessonSection]) sections!: LessonSection[];
}

@InputType()
class GenerateLessonInput {
  @Field() topic!: string;
  @Field() level!: string;
  @Field(() => Int, { nullable: true }) sections?: number;
}

@ObjectType()
class GeneratedQuizQuestion {
  @Field() question!: string;
  @Field(() => [String]) options!: string[];
  @Field() answer!: string;
  @Field({ nullable: true }) explanation?: string;
}

@InputType()
class GenerateQuizInput {
  @Field() text!: string;
  @Field(() => Int) count!: number;
  @Field() level!: string;
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
    console.log(input, 'jjj');
    return this.generator.generateVocabulary(input);
  }

  @Mutation(() => [GeneratedExampleSentence])
  async generateExamples(@Args('input') input: GenerateExamplesInput) {
    return this.generator.generateExamples(input);
  }

  @Mutation(() => GeneratedLesson)
  async generateLessonOutline(@Args('input') input: GenerateLessonInput) {
    return this.generator.generateLessonOutline(input);
  }

  @Mutation(() => [GeneratedQuizQuestion])
  async generateQuiz(@Args('input') input: GenerateQuizInput) {
    return this.generator.generateQuiz(input);
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
    return this.generator.explainGrammar(
      concept,
      level,
      targetLanguage,
      sourceLanguage,
    );
  }

  @Query(() => TranslationResponse)
  async translateWithExplanation(
    @Args('text') text: string,
    @Args('sourceLanguage') sourceLanguage: string,
    @Args('targetLanguage') targetLanguage: string,
    @Args('level', { defaultValue: 'A1' }) level: string,
  ) {
    return this.generator.translateWithExplanation(
      text,
      sourceLanguage,
      targetLanguage,
      level,
    );
  }

  @Query(() => String)
  async summarizeText(
    @Args('text') text: string,
    @Args('targetLanguage', { defaultValue: 'German' }) targetLanguage: string,
  ) {
    return this.generator.summarizeText(text, targetLanguage);
  }

  @Mutation(() => String)
  async paraphraseText(
    @Args('text') text: string,
    @Args('level', { defaultValue: 'A2' }) level: string,
  ) {
    return this.generator.paraphraseText(text, level);
  }
}
