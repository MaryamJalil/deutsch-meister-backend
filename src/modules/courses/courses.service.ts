import { Injectable } from '@nestjs/common/index.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Level } from '../levels/level.model.js';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async createCourse(title: string, language: string) {
    console.log(title, language);
    return this.prisma.course.create({
      data: {
        title,
        language,
      },
    });
  }
}
