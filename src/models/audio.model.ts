import { ObjectType, Field, Int } from '@nestjs/graphql';

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

  @Field(() => require('./lesson.model.js').LessonModel, { nullable: true })
  lesson?: any;

  @Field()
  createdAt: Date;
}
