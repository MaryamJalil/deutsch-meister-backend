import { ObjectType, Field, Int } from '@nestjs/graphql';
import { LessonModel } from './lesson.model';
import { LevelModel } from './level.model';
import { ProgressModel } from './progress.model';

@ObjectType()
export class CourseModel {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  levelId: number;

  @Field(() => LevelModel, { nullable: true })
  level?: LevelModel;

  @Field(() => [LessonModel], { nullable: true })
  lessons?: LessonModel[];

  @Field(() => [ProgressModel], { nullable: true })
  progresses?: ProgressModel[];

  @Field()
  createdAt: Date;
}
