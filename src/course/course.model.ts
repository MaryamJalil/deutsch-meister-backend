import { ObjectType, Field, Int } from '@nestjs/graphql';


@ObjectType()
export class CourseModel {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  levelId: number;

//   @Field(() => LevelModel)
//   level: LevelModel;

//   @Field(() => [LessonModel], { nullable: true })
//   lessons?: LessonModel[];

  @Field()
  createdAt: Date;
}
