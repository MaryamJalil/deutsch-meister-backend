import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProgressModel } from './progress.model.js';

@ObjectType()
export class LevelModel {
  @Field(() => Int)
  id: number;

  @Field()
  slug: string;

  @Field()
  title: string;

  @Field(() => Int)
  order: number;

  @Field(() => [require('./course.model.js').CourseModel], { nullable: true })
  courses?: any[];

  @Field(() => [require('./lesson.model.js').LessonModel], { nullable: true })
  lessons?: any[];

  @Field(() => require('./quiz.model.js').QuizModel, { nullable: true })
  quiz?: any;

  @Field(() => [ProgressModel], { nullable: true })
  progresses?: ProgressModel[];
}
