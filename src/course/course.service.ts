import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCourseInput } from './create-course.input';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async createCourse(input: CreateCourseInput) {
    return this.prisma.course.create({
      data: {
        title: input.title,
        levelId: input.levelId,
      },
    });
  }

  async findCourseById(id: number) {
    return this.prisma.course.findUnique({ where: { id } });
  }

  async findCourses() {
    return this.prisma.course.findMany({
      include: { level: true }, // optional: include related Level data
    });
  }
}
