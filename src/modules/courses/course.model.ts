import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Level } from '../levels/level.model.js';

@ObjectType()
export class Course {
  @Field(() => Int)
  id!: number;

  @Field()
  title!: string;

  @Field()
  language!: string;

  @Field(() => [Level])
  levels!: Level[];
}
