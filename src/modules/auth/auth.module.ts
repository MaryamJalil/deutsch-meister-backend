import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { AuthService } from './auth.service.js';
import { AuthResolver } from './auth.resolver.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';


@Module({
  imports: [
    PrismaModule,
    JwtModule.register({}),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
