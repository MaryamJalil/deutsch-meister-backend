import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class GenerateVocabularyInput {
  @Field()
  @IsNotEmpty()
  topic!: string;

  @Field()
  @IsNotEmpty()
  level!: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  count?: number;

  @Field()
  @IsNotEmpty()
  targetLanguage!: string;

  @Field()
  @IsNotEmpty()
  sourceLanguage!: string;
}
