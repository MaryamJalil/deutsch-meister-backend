import { Field, InputType, Int } from '@nestjs/graphql/dist';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateVocabularyInput {
  @Field(() => String)
  @IsString()
  word!: string;

  @Field(() => String)
  @IsString()
  meaning!: string;

  @Field(() => Int)
  @IsInt()
  lessonId!: number;
}

@InputType()
export class UpdateVocabularyInput {
  @Field(() => Int)
  @IsInt()
  id!: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  word?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  meaning?: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  lessonId?: number;
}

@InputType()
export class VocabularyItemInput {
  @Field(() => String)
  @IsString()
  word!: string;

  @Field(() => String)
  @IsString()
  meaning!: string;
}

@InputType()
export class CreateBulkVocabularyInput {
  @Field(() => Int)
  @IsInt()
  lessonId!: number;

  @Field(() => [VocabularyItemInput])
  vocabularyItems!: VocabularyItemInput[];
}
