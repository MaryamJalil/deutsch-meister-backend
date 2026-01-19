import { InputType, Field } from '@nestjs/graphql';
import { Role } from '../../../common/enums/role.enum.js';
import { IsEmail, IsEnum, MinLength } from 'class-validator';

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
