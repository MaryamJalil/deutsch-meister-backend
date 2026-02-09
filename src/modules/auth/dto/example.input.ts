import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateExampleInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  sentence!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  translation!: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  lessonId!: number;
}

@InputType()
export class UpdateExampleInput {
  @Field(() => Int)
  @IsInt()
  id!: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  sentence?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  translation?: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  lessonId?: number;
}
