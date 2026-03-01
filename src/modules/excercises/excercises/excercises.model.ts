import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ExcerciseType } from '../../../common/enums/excerciseType.enum';
import { IsInt, IsOptional, IsEnum, Min, Max } from 'class-validator';

@ObjectType()
export class Exercise {
  @Field(() => Int)
  id!: number;

  @Field(() => Int)
  lessonId!: number;

  @Field(() => ExcerciseType)
  type!: ExcerciseType;

  @Field(() => String)
  question!: string;

  @Field(() => String, { nullable: true })
  audioFile?: string | null;

  @Field(() => String, { nullable: true })
  hint?: string | null;

  @Field()
  createdAt!: Date;
}

@InputType()
export class GenerateExercisesInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  lessonId!: number;

  @Field(() => ExcerciseType, { nullable: true })
  @IsOptional()
  @IsEnum(ExcerciseType)
  type?: ExcerciseType;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50) // prevent abuse
  count?: number;
}
