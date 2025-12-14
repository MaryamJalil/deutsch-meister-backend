import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload-ts';
import { AudioService } from './audio.service';
import { AudioModel, CreateAudioInput } from 'src/models/audio.model';

@Resolver(() => AudioModel)
export class AudioResolver {
  constructor(private readonly audioService: AudioService) {}

  @Mutation(() => AudioModel)
  async uploadAudio(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    @Args('lessonId', { type: () => Number, nullable: true }) lessonId?: number,
  ): Promise<AudioModel> {
    const { createReadStream, filename, mimetype } = await file;
  
    const chunks: Buffer[] = [];
    for await (const chunk of createReadStream()) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
  
    const buffer = Buffer.concat(chunks);
  
    const { url, key } = await this.audioService.uploadAudioFile({
      buffer,
      originalname: filename,
      mimetype,
    });
  
    // ✅ DEFINE TITLE
    const title = filename.replace(/\.[^/.]+$/, '');
  
    const input: CreateAudioInput = {
      title,
      filename,
      s3Key: key,
      url,
      lessonId,
    };
  
    return this.audioService.saveAudioMetadata(input);
  }
  
  
}