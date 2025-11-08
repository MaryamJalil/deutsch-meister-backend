import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CourseModel } from './course.model';
import { LevelModel } from './level.model';
import { ProgressModel } from './progress.model';
import { AudioModel } from './audio.model';

@ObjectType()
export class LessonModel {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => Int)
  order: number;

  @Field(() => Int)
  courseId: number;

  @Field(() => CourseModel, { nullable: true })
  course?: CourseModel;

  @Field(() => Int, { nullable: true })
  levelId?: number;

  @Field(() => LevelModel, { nullable: true })
  level?: LevelModel;

  // @Field(() => AudioModel, { nullable: true })
  // audio?: AudioModel;

  @Field(() => [ProgressModel], { nullable: true })
  progresses?: ProgressModel[];

  @Field()
  createdAt: Date;
}
