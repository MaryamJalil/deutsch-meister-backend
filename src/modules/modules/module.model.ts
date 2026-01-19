import { ObjectType, Field, Int } from '@nestjs/graphql';
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
   * Relation: Module belongs to one Level (exposed as levelId to avoid circular deps)
   */
  @Field(() => Int)
  levelId!: number;

  /**
   * Relation: Module contains many Lessons
   */
  @Field(() => [Lesson])
  lessons!: Lesson[];
}
