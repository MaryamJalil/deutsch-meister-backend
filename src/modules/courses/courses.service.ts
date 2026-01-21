import { Injectable } from '@nestjs/common/index.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { UpdateCourseInput } from '../auth/dto/course.input.js';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async createCourse(title: string, language: string) {
    return this.prisma.course.create({
      data: {
        title,
        language,
      },
    });
  }
  async updateCourse(input: UpdateCourseInput) {
    return this.prisma.course.update({
      where: { id: input.id },
      data: {
        ...input,
      },
    });
  }
  async getCourses() {
    return this.prisma.course.findMany();
  }
  async getCourse(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }
}
