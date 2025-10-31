import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @Field()
  @IsString()
  @MinLength(3)
  title: string;

  @Field()
  @IsString()
  content: string; // Markdown or HTML

  @Field(() => Int)
  @IsInt()
  courseId: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  levelId?: number;

  @Field(() => Int)
  @IsInt()
  order: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  audioId?: number;
}

@InputType()
export class UpdateLessonInput {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  content?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  courseId?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  levelId?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  order?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  audioId?: number;
}
