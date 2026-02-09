import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Vocabulary {
  @Field(() => Int)
  id!: number;

  @Field()
  word!: string;

  @Field()
  meaning!: string;
}
