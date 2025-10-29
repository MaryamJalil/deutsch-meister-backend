// src/course/dto/create-course.input.ts

import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt, MinLength } from 'class-validator';

@InputType()
export class CreateCourseInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @Field(() => Int)
  @IsInt()
  levelId: number;
}
