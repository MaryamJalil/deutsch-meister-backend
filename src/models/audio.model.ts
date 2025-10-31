import { ObjectType, Field, Int } from '@nestjs/graphql';
import { LessonModel } from './lesson.model';

@ObjectType()
export class AudioModel {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  url: string;

  @Field(() => Int, { nullable: true })
  duration?: number;

  @Field(() => LessonModel, { nullable: true })
  lesson?: LessonModel;

  @Field()
  createdAt: Date;
}
