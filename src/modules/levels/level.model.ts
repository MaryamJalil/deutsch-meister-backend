import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Module } from '../modules/module.model';
import { LevelCode } from '../../common/enums/levelName.enum';


@ObjectType()
export class Level {
  @Field(() => Int)
  id!: number;

  @Field(() => LevelCode)
  code!: LevelCode;

  @Field(() => Int)
  position!: number;

  @Field(() => Int)
  courseId!: number;

  @Field(() => [Module], { nullable: 'itemsAndList' })
  modules?: Module[];
}
