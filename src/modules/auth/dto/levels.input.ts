import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';
import { LevelName } from '../../../common/enums/levelName.enum.js';

@InputType()
export class CreateLevelInput {
  @Field(() => LevelName)
  @IsEnum(LevelName)
  code!: LevelName;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  position!: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  courseId!: number;
}

@InputType()
export class UpdateLevelInput {
  @Field(() => Int)
  @IsInt()
  id!: number;

  @Field(() => LevelName, { nullable: true })
  @IsEnum(LevelName)
  @IsOptional()
  code?: LevelName;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsPositive()
  @IsOptional()
  position?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsPositive()
  @IsOptional()
  courseId?: number;
}
