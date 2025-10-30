import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProgressModel } from './progress.model';
import { QuizModel } from './quiz.model';
import { LessonModel } from './lesson.model';
import { CourseModel } from './course.model';


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

  @Field(() => [CourseModel], { nullable: true })
  courses?: CourseModel[];

  @Field(() => [LessonModel], { nullable: true })
  lessons?: LessonModel[];

  @Field(() => QuizModel, { nullable: true })
  quiz?: QuizModel;

  @Field(() => [ProgressModel], { nullable: true })
  progresses?: ProgressModel[];
}
