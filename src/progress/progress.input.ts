// progress.input.ts
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';

@InputType()
export class CreateProgressInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  lessonId?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  levelId?: number;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  completed: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  score?: number;
}
@InputType()
export class UpdateProgressInput {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  lessonId?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  levelId?: number;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  completed: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  score?: number;
}
