import { Field, Int, ObjectType } from '@nestjs/graphql/dist/index.js';

@ObjectType()
export class Vocabulary {
  @Field(() => Int)
  id!: number;

  @Field()
  word!: string;

  @Field()
  meaning!: string;
}
