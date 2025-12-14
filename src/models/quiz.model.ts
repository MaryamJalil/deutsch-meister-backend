import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class QuizModel {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  levelId: number;

  @Field(() => require('./level.model.js').LevelModel, { nullable: true })
  level?: any;

  @Field(() => [require('./question.model.js').QuestionModel], { nullable: true })
  questions?: any[];

  @Field()
  createdAt: Date;
}
