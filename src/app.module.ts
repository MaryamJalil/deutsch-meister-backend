import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './modules/users/users.module.js';
import { ConfigModule } from '@nestjs/config/index.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { CoursesModule } from './modules/courses/courses.module.js';
import type { Request } from 'express';
import { LevelModule } from './modules/levels/level.module.js';
import { LessonModule } from './modules/lessons/lesson.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // <-- makes ConfigService global
    PrismaModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    LevelModule,
    LessonModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      playground: true,
      context: ({ req }: { req: Request }) => ({ req }),
    }),
  ],
})
export class AppModule {}
