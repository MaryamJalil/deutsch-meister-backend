import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserModel } from './user.model';
import { CreateUserInput } from './create-user.input';
import { AuthPayload } from './auth-payload.model';
import { LoginInput } from './login.input';


@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserModel, { nullable: true })
  async user(@Args('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @Query(() => UserModel, { nullable: true })
  async userById(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findUserById(id);
  }

  @Mutation(() => UserModel)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.createUser(input);
  }

  @Mutation(() => AuthPayload)
  async login(@Args('input') input: LoginInput) {
    return this.usersService.login(input);
  }
}
