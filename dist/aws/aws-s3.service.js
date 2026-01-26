"use strict";
// import { Injectable, Logger } from '@nestjs/common';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import { ConfigService } from '@nestjs/config';
// import { v4 as uuidv4 } from 'uuid';
// import { extname } from 'path';
// @Injectable()
// export class AwsS3Service {
//   private readonly s3: S3Client;
//   private readonly bucket: string;
//   private readonly logger = new Logger(AwsS3Service.name);
//   constructor(private configService: ConfigService) {
//   //   this.bucket = this.configService.get<string>('AWS_S3_BUCKET');
//   //   this.s3 = new S3Client({
//   //     region: this.configService.get<string>('AWS_REGION'),
//   //     credentials: {
//   //       accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
//   //       secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
//   //     },
//   //   });
//   // }
//   async uploadAudio(file: Express.Multer.File): Promise<string> {
//     const fileExtension = extname(file.originalname);
//     const key = `audio/${uuidv4()}${fileExtension}`;
//     await this.s3.send(
//       new PutObjectCommand({
//         Bucket: this.bucket,
//         Key: key,
//         Body: file.buffer,
//         ContentType: file.mimetype,
//       }),
//     );
//     const fileUrl = `https://${this.bucket}.s3.${this.configService.get<string>(
//       'AWS_REGION',
//     )}.amazonaws.com/${key}`;
//     this.logger.log(`Uploaded file: ${fileUrl}`);
//     return fileUrl;
//   }
// }
