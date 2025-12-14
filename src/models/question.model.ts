import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class QuestionModel {
  @Field(() => Int)
  id: number;

  @Field()
  question: string;

  @Field(() => [String])
  options: string[];

  @Field()
  correct: string;

  @Field(() => Int)
  quizId: number;

  @Field(() => require('./quiz.model.js').QuizModel, { nullable: true })
  quiz?: any;
}
