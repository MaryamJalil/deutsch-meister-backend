import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { FileUpload } from 'graphql-upload-ts';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  private s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  async uploadAudio(
    file: FileUpload,
    level: string,
  ): Promise<{ url: string; key: string; filename: string }> {
    const { createReadStream, filename, mimetype } = file;

    const key = `audio/${level}/${uuid()}-${filename}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: key,
        Body: createReadStream(),
        ContentType: mimetype,
      }),
    );

    const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return { url, key, filename };
  }
}
