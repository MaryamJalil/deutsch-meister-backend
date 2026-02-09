import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class GenerateVocabularyInputType {
  @Field()
  topic!: string;

  @Field()
  level!: string;

  @Field(() => Int)
  count!: number;

  @Field()
  targetLanguage!: string;

  @Field()
  sourceLanguage!: string;
}
