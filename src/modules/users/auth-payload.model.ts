import { Field, ObjectType } from '@nestjs/graphql';
import { UsersModule } from './users.module.js';

@ObjectType()
export class AuthPayload {
  @Field()
  token!: string;

  @Field(() => UsersModule)
  user!: UsersModule;
}
