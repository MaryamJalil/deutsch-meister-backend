import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { UsersService } from './users.service.js';
import { UsersResolver } from './users.resolver.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'maryam', // TODO: Move to env
      signOptions: { expiresIn: '1d' },
    }),
    PrismaModule,
  ],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
