import { Module } from '@nestjs/common';
import { AudioResolver } from './audio.resolver';
import { AudioService } from './audio.service';
import { S3Service } from './s3.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [AudioResolver, AudioService, S3Service, PrismaService],
})
export class AudioModule {}
