import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { RegisterInput } from './dto/register.input.js';
import { AuthService } from './auth.service.js';
import { LoginInput } from './dto/login.input.js';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async register(@Args('input') input: RegisterInput): Promise<boolean> {
    await this.authService.register(input.email, input.password, input.role);
    return true;
  }

  @Mutation(() => String)
  async login(@Args('input') input: LoginInput): Promise<string> {
    const { accessToken } = await this.authService.login(
      input.email,
      input.password,
    );
    return accessToken;
  }
}
