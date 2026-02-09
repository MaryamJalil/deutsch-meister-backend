import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsEmail, IsEnum, MinLength } from 'class-validator';
import { Role } from '../../../common/enums/role.enum';

registerEnumType(Role, {
  name: 'Role',
});

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(8)
  password!: string;

  @Field(() => Role)
  @IsEnum(Role)
  role!: Role;
}
