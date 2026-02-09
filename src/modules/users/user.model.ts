import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from '../../common/enums/role.enum';

@ObjectType()
export class User {
  @Field(() => Int)
  id!: number;

  @Field()
  email!: string;

  @Field(() => Role)
  role!: Role;

  @Field()
  createdAt!: Date;
}
