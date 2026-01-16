import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Level } from '../levels/level.model.js';
import { Lesson } from '../lessons/lesson.model.js';

@ObjectType()
export class Module {
  @Field(() => Int)
  id!: number;

  @Field()
  title!: string;

  /**
   * Defines the order of the module inside a level
   * Example: 1 = first module, 2 = second module
   */
  @Field(() => Int)
  order!: number;

  /**
   * Relation: Module belongs to one Level
   */
  @Field(() => Level)
  level!: Level;

  /**
   * Relation: Module contains many Lessons
   */
  @Field(() => [Lesson])
  lessons!: Lesson[];
}
