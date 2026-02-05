import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './modules/users/users.module.js';
import { ConfigModule } from '@nestjs/config/index.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { CoursesModule } from './modules/courses/courses.module.js';
import type { Request } from 'express';
import { LevelModule } from './modules/levels/level.module.js';
import { LessonModule } from './modules/lessons/lesson.module.js';
import { configuration } from './config/configuration.js';
import { VocabularyModule } from './modules/vocabulary/vocabulary.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      playground: true,
      context: ({ req }: { req: Request }) => ({ req }),
    }),
    AuthModule,
    UsersModule,
    CoursesModule,
    LevelModule,
    LessonModule,
    VocabularyModule,
  ],
})
export class AppModule {}
