import { Injectable, NotFoundException } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as path from 'path';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAudioInput } from 'src/models/audio.model';

interface UploadedFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}

@Injectable()
export class AudioService {
  private readonly s3: S3Client;

  constructor(private readonly prisma: PrismaService) {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async uploadAudioFile(file: UploadedFile): Promise<{ url: string; key: string; filename: string }> {
    const key = `audio/${Date.now()}-${path.basename(file.originalname)}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return { url, key, filename: file.originalname };
  }

  async saveAudioMetadata(input: CreateAudioInput) {
    // Conditionally connect the lesson if lessonId is provided
    const data: any = {
      title: input.title,
      filename: input.filename,
      s3Key: input.s3Key,
      url: input.url,
    };

    if (input.lessonId) {
      data.lesson = { connect: { id: input.lessonId } };
    }

    return this.prisma.audio.create({ data });
  }

  async getAudioUrl(id: string) {
    const audio = await this.prisma.audio.findUnique({ 
      where: { id: Number(id) } 
    });
    
    if (!audio) {
      throw new NotFoundException('Audio not found');
    }

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: audio.s3Key,
    });

    return getSignedUrl(this.s3, command, { expiresIn: 3600 });
  }
}
