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

  @Field({ nullable: true }) // Add this field
  description?: string;

  @Field(() => Int, { nullable: true }) // Add this field
  hours?: number;

  @Field(() => Int, { nullable: true }) // Add this field
  lessonCount?: number;

  @Field(() => [String], { nullable: true }) // Add this field
  features?: string[];

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

    @Field()
  updatedAt: Date;
}