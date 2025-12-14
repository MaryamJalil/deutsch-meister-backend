import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @HideField() // This hides the password from GraphQL responses
  password: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  currentLevel?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}