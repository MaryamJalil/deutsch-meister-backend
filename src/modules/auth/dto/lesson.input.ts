import { Field, InputType, Int } from '@nestjs/graphql/dist/index.js';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  content?: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  order!: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  levelId!: number;
}
