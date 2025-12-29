import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLessonInput, UpdateLessonInput } from './lesson.input';

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

   async createLesson(input: CreateLessonInput) {
    return this.prisma.lesson.create({
      data: {
        title: input.title,
        content: input.content,
        order: input.order,
        course: {
          connect: { id: input.courseId },
        },
      },
      include: {
        course: true,
      },
    });
  }

  async updateLesson(input: UpdateLessonInput) {
    const { id, ...updateData } = input;
    return this.prisma.lesson.update({
      where: { id },
      data: updateData,
    });
  }

  async findAlllessons() {
    return this.prisma.lesson.findMany({
      include: { level: true },
    });
  }

  async findLessonById(id: number) {
    return this.prisma.lesson.findUnique({ where: { id } });
  }

  async getLessonsByCourse(courseId: number) {
  return this.prisma.lesson.findMany({
    where: { courseId },
    include: {
      level: true,
      audio: true,
    },
    orderBy: { order: 'asc' },
  });
}

}
