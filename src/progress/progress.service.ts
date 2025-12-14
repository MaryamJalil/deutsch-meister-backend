import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateProgressInput, UpdateProgressInput } from './progress.input.js';

@Injectable()
export class ProgressService {
  constructor(private readonly prisma: PrismaService) {}

  async createProgress(input: CreateProgressInput, userId: number) {
    return this.prisma.progress.create({
      data: {
        userId: userId,
        lessonId: input.lessonId,
        levelId: input.levelId,
        completed: input.completed,
        score: input.score,
      },
    });
  }

  async updateLesson(input: UpdateProgressInput) {
    const { id, ...updateData } = input;
    return this.prisma.progress.update({
      where: { id },
      data: updateData,
    });
  }
  async findProgressById(id: number) {
    return this.prisma.course.findUnique({ where: { id } });
  }

  async findProgressByCourseId(courseId: number) {
    return this.prisma.progress.findMany({
      where: {
        lesson: {
          courseId: courseId, // ✅ navigate through the lesson relation
        },
      },
      include: {
        user: true,
        lesson: {
          include: {
            course: true, // ✅ include course info if needed
          },
        },
      },
    });
  }

  async findProgress() {
    return this.prisma.progress.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        lesson: true,
        level: true,
      },
    });
  }
}
