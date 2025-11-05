// src/course/course.input.ts
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCourseInput {
  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  hours?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  lessonCount?: number;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  features?: string[];

  @Field(() => Int)
  @IsInt()
  levelId: number;
}

@InputType()
export class UpdateCourseInput {
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
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  hours?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  lessonCount?: number;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  features?: string[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  levelId?: number;
}