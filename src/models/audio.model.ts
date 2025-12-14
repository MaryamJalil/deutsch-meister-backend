import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { LessonModel } from './lesson.model';
import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

@ObjectType()
export class AudioModel {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;  

  @Field()
  url: string;

  @Field(() => Int, { nullable: true })
  duration?: number;

  @Field(() => LessonModel, { nullable: true })
  lesson?: LessonModel;

  @Field()
  createdAt: Date;
}


@InputType()
export class CreateAudioInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  filename: string;

  @Field()
  @IsString()
  s3Key: string;

  @Field()
  @IsUrl()
  url: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  lessonId?: number;
}
