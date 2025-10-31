import { ObjectType, Field, Int } from '@nestjs/graphql';
import { LevelModel } from './level.model';
import { UserModel } from './user.model';
import { CourseModel } from './course.model';
import { LessonModel } from './lesson.model';

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

  @Field(() => CourseModel, { nullable: true })
  course?: CourseModel;

  @Field(() => Int, { nullable: true })
  lessonId?: number;

  @Field(() => LessonModel, { nullable: true })
  lesson?: LessonModel;

  @Field(() => Int, { nullable: true })
  levelId?: number;

  @Field(() => LevelModel, { nullable: true })
  level?: LevelModel;

  @Field(() => Int)
  xp: number;

  @Field({ nullable: true })
  completedAt?: Date;
}
