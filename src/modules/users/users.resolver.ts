import { Resolver, Query } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async getUsers() {
    return this.usersService.findAll();
  }
}
