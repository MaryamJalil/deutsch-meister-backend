import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProgressModel } from './progress.model.js';

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

  @Field(() => require('./course.model.js').CourseModel, { nullable: true })
  course?: any;

  @Field(() => Int, { nullable: true })
  levelId?: number;

  @Field(() => require('./level.model.js').LevelModel, { nullable: true })
  level?: any;

  // @Field(() => AudioModel, { nullable: true })
  // audio?: AudioModel;

  @Field(() => [ProgressModel], { nullable: true })
  progresses?: ProgressModel[];

  @Field()
  createdAt: Date;
}
