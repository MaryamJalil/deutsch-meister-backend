import { ObjectType, Field, Int } from '@nestjs/graphql';
import { LevelModel } from './level.model';
import { QuestionModel } from './question.model';

@ObjectType()
export class QuizModel {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  levelId: number;

  @Field(() => LevelModel, { nullable: true })
  level?: LevelModel;

  @Field(() => [QuestionModel], { nullable: true })
  questions?: QuestionModel[];

  @Field()
  createdAt: Date;
}
