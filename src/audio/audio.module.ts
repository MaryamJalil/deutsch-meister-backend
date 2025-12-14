import { Module } from '@nestjs/common';
import { AudioResolver } from './audio.resolver';
import { AudioService } from './audio.service';

@Module({
  providers: [AudioResolver, AudioService],
})
export class AudioModule {}
