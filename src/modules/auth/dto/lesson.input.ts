import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  content?: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  order!: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  levelId!: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  moduleId?: number;
}

@InputType()
export class UpdateLessonInput {
  @Field(() => Int)
  @IsInt()
  id!: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  content?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  order?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  levelId?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  moduleId?: number;
}
