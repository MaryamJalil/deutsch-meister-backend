import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Example {
  @Field(() => Int)
  id!: number;

  @Field()
  sentence!: string;

  @Field()
  translation!: string;
}
