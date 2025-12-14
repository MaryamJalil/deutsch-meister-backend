import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  currentLevel?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

