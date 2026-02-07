import { Field, InputType, Int } from '@nestjs/graphql/dist/index.js';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @Field({ nullable: true })
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

  @Field({ nullable: true })
  moduleId?: number;
}
@InputType()
export class UpdateLessonInput {
  @Field(() => Int)
  @IsInt()
  id!: number;

  @Field()
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  content?: string;

  @Field(() => Int)
  @IsOptional()
  order?: number;

  @Field(() => Int)
  @IsOptional()
  levelId?: number;

  @Field({ nullable: true })
  @IsOptional()
  moduleId?: number;
}
