import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TutorResponse {
  @Field()
  message!: string;

  @Field(() => [String], { nullable: true })
  relatedLessons?: string[];
}
