import { ObjectType, Field, Int } from '@nestjs/graphql';
import { QuizModel } from './quiz.model';

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

  @Field(() => QuizModel, { nullable: true })
  quiz?: QuizModel;
}
