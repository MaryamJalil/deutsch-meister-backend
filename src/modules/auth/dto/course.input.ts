import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCourseInput {
  @Field()
  @IsNotEmpty()
  title!: string;

  @Field()
  @IsNotEmpty()
  language!: string;
}

@InputType()
export class UpdateCourseInput {
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
  language?: string;
}
