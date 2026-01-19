import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Module } from '../modules/module.model.js';
import { CEFRLevel } from '../..//common/enums/cefr-level.enum.js';

@ObjectType()
export class Level {
  @Field(() => Int)
  id!: number;

  @Field(() => CEFRLevel)
  code!: CEFRLevel;

  @Field(() => Int)
  order!: number;

  @Field(() => Int)
  courseId!: number;

  @Field(() => [Module])
  modules!: Module[];
}
