import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Vocabulary } from './vocabulary.model.js';
import { Example } from './example.model.js';
@ObjectType()
export class Lesson {
  @Field(() => Int)
  id!: number;

  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  content?: string;

  @Field(() => Int)
  order!: number;

  @Field(() => [Vocabulary])
  vocabulary!: Vocabulary[];

  @Field(() => [Example])
  examples!: Example[];

  @Field()
  createdAt!: Date;
}
