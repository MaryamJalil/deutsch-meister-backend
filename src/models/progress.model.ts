import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserModel } from './user.model.js';

@ObjectType()
export class ProgressModel {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => Int, { nullable: true })
  courseId?: number;

  @Field(() => require('./course.model.js').CourseModel, { nullable: true })
  course?: any;

  @Field(() => Int, { nullable: true })
  lessonId?: number;

  @Field(() => require('./lesson.model.js').LessonModel, { nullable: true })
  lesson?: any;

  @Field(() => Int, { nullable: true })
  levelId?: number;

  @Field(() => require('./level.model.js').LevelModel, { nullable: true })
  level?: any;

  @Field(() => Int)
  xp: number;

  @Field({ nullable: true })
  completedAt?: Date;
}
