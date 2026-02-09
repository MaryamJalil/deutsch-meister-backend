import { Resolver, Mutation, Args, ObjectType, Field, Int } from '@nestjs/graphql';
import { RegisterInput } from './dto/register.input';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;
}

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async register(@Args('input') input: RegisterInput): Promise<AuthPayload> {
    return this.authService.register(input.email, input.password, input.role);
  }

  @Mutation(() => AuthPayload)
  async login(@Args('input') input: LoginInput): Promise<AuthPayload> {
    return this.authService.login(input.email, input.password);
  }

  @Mutation(() => AuthPayload)
  async refreshTokens(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('refreshToken') refreshToken: string,
  ): Promise<AuthPayload> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
