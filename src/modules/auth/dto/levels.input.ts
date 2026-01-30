import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';
import { LevelCode} from '../../../common/enums/levelName.enum';

@InputType()
export class CreateLevelInput {
  @Field(() => LevelCode)
  @IsEnum(LevelCode)
  code!:  LevelCode;

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

  @Field(() => LevelCode, { nullable: true })
  @IsEnum(LevelCode)
  @IsOptional()
  code?: LevelCode;

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
