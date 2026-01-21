import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Module } from '../modules/module.model.js';
import { LevelName } from '../../common/enums/levelName.enum.js';

@ObjectType()
export class Level {
  @Field(() => Int)
  id!: number;

  @Field(() => LevelName)
  code!: LevelName;

  @Field(() => Int)
  position!: number;

  @Field(() => Int)
  courseId!: number;

  @Field(() => [Module], { nullable: 'itemsAndList' })
  modules?: Module[];
}
