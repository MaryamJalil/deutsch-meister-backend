import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from '../prisma/prisma.module.js';
import { UsersModule } from './users/users.module.js';




@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), 
      playground: true,  // ✅ enables http://localhost:3000/graphql UI
      sortSchema: true,
    }),
    UsersModule
  ],
})
export class AppModule {}
