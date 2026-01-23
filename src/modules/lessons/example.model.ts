import { Field, Int, ObjectType } from '@nestjs/graphql/dist/index.js';

@ObjectType()
export class Example {
  @Field(() => Int)
  id!: number;

  @Field()
  sentence!: string;

  @Field()
  translation!: string;
}
