import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './modules/users/users.module.js';
import { ConfigModule } from '@nestjs/config/index.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
        ConfigModule.forRoot({ isGlobal: true }), // <-- makes ConfigService global
    PrismaModule,

    UsersModule, // ✅ must include your modules with resolvers
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      playground: true,
    }),
  ],
})
export class AppModule {}
