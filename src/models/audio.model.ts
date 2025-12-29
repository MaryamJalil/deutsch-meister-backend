// src/models/audio.model.ts
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

@ObjectType()
export class AudioModel {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  fileName: string;

  @Field()
  url: string;

  @Field()
  s3Key: string;

  @Field(() => Int, { nullable: true })
  lessonId?: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  // Optional: Add order field if you have it
  @Field(() => Int, { nullable: true })
  order?: number;

  // Optional: Add description field if you have it
  @Field({ nullable: true })
  description?: string;
}
// src/models/audio.model.ts (or wherever CreateAudioInput is defined)
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

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  order?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  duration?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}