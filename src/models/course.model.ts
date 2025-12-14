import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProgressModel } from './progress.model.js';

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

  @Field(() => {
    const { LevelModel } = require('./level.model.js');
    return LevelModel;
  }, { nullable: true })
  level?: any;

  @Field(() => {
    const { LessonModel } = require('./lesson.model.js');
    return [LessonModel];
  }, { nullable: true })
  lessons?: any[];

  @Field(() => [ProgressModel], { nullable: true })
  progresses?: ProgressModel[];

  @Field()
  createdAt: Date;

    @Field()
  updatedAt: Date;
}