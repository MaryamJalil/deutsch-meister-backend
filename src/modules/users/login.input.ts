import { ObjectType, Field, Int } from '@nestjs/graphql';
import { $Enums, Role } from '@prisma/client';


@ObjectType()
export class User {
  @Field(() => Int)
  id!: number;

  @Field()
  email!: string;

 @Field(() => Role)
role!: $Enums.Role;

  @Field()
  createdAt!: Date;
}
