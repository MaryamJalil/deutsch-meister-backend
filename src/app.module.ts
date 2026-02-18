import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CoursesModule } from './modules/courses/courses.module';
import type { Request } from 'express';
import { LevelModule } from './modules/levels/level.module';
import { LessonModule } from './modules/lessons/lesson.module';
import { configuration } from './config/configuration';
import { VocabularyModule } from './modules/vocabulary/vocabulary.module';
import { ExampleModule } from './modules/examples/example.module';
import { ModulesModule } from './modules/modules/modules.module';
import { CacheModule } from './modules/cache/cache.module';
import { EventsModule } from './modules/events/events.module';
import { AIModule } from './modules/ai/ai.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    ModulesModule,
    VocabularyModule,
    ExampleModule,
    CacheModule,
    EventsModule,
    AIModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
