import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
