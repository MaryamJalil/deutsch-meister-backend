import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { AuthResolver } from './auth.resolver.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
