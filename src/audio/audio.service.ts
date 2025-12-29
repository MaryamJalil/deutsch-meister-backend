import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { S3Service } from './s3.service';
import { FileUpload } from 'graphql-upload-ts';

@Injectable()
export class AudioService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async uploadLessonAudio(
    title: string,
    lessonId: number,
    level: string,
    file: FileUpload,
  ) {
    const { url, key, filename } = await this.s3Service.uploadAudio(
      file,
      level,
    );

    return this.prisma.audio.create({
      data: {
        title,
        filename,
        s3Key: key,
        url,
        lesson: {
          connect: { id: lessonId },
        },
      },
    });
  }

  async getAudioByLesson(lessonId: number) {
    return this.prisma.audio.findMany({
      where: { lessonId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
