import { ObjectType, Field, Int } from '@nestjs/graphql';
@ObjectType()
export class Lesson {
  @Field(() => Int)
  id!: number;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field(() => Int)
  order!: number;
}
