import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateModuleInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  title!: string;

  @Field(() => Int)
  @IsInt()
  order!: number;

  @Field(() => Int)
  @IsInt()
  levelId!: number;
}

@InputType()
export class UpdateModuleInput {
  @Field(() => Int)
  @IsInt()
  id!: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  order?: number;
}
