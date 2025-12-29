import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'maryam', // Hardcoded for now
      signOptions: { expiresIn: '1d' },
    }),
    PrismaModule,
  ],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}