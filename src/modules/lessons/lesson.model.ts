import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Vocabulary } from '../vocabulary/vocabulary.model.js';
import { Example } from '../examples/example.model.js';

@ObjectType()
export class Lesson {
  @Field(() => Int)
  id!: number;

  @Field()
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String, { nullable: true })
  content?: string | null;

  @Field(() => Int)
  order!: number;

  @Field(() => Int)
  levelId!: number;

  @Field(() => Int, { nullable: true })
  moduleId?: number | null;

  @Field(() => [Vocabulary], { nullable: true })
  vocabulary?: Vocabulary[] | null;

  @Field(() => [Example], { nullable: true })
  examples?: Example[] | null;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
