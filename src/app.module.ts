import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from '../prisma/prisma.module.js';
import { UsersModule } from './users/users.module.js';
import { ProgressResolver } from './progress/progress.resolver.js';
import { ProgressService } from './progress/progress.service.js';
import { CourseModule } from './course/course.module.js';
import { LevelModule } from './level/level.module.js';
import { LessonsModule } from './lessons/lessons.module.js';
import { ProgressModule } from './progress/progress.module.js';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: process.env.NODE_ENV !== 'production',
      sortSchema: true,
      introspection: process.env.NODE_ENV !== 'production',
    }),
    UsersModule,
    CourseModule,
    LevelModule,
    LessonsModule,
    ProgressModule,
  ],
  providers: [ProgressResolver, ProgressService],
})
export class AppModule {}