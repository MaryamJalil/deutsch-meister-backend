import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload-ts';
import { AudioService } from './audio.service';
import { AudioModel } from 'src/models/audio.model';
import { Scalar } from '@nestjs/graphql';
import { Kind, GraphQLScalarType } from 'graphql';

@Resolver(() => AudioModel)
export class AudioResolver {
  constructor(private readonly audioService: AudioService) {}

  @Mutation(() => AudioModel)
  uploadLessonAudio(
    @Args('title') title: string,
    @Args('lessonId', { type: () => Int }) lessonId: number,
    @Args('level') level: string,
  @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return this.audioService.uploadLessonAudio(
      title,
      lessonId,
      level,
      file,
    );
  }

  @Query(() => [AudioModel])
  audioByLesson(
    @Args('lessonId', { type: () => Int }) lessonId: number,
  ) {
    return this.audioService.getAudioByLesson(lessonId);
  }
}
