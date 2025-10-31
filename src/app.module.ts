import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CourseModule } from './course/course.module';
import { LevelModule } from './level/level.module';
import { LessonsModule } from './lessons/lessons.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    PrismaModule,
    UsersModule,
    CourseModule,
    LevelModule,
    LessonsModule
  ],
})
export class AppModule {}