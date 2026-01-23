import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class LessonService {
  constructor(private readonly prisma: PrismaService) {}
  async createLessonAtPosition(
    title: string,
    order: number,
    levelId: number,
    description?: string,
    content?: string,
  ): Promise<any> {
    // Insert new lesson
    return this.prisma.$transaction(async (tx) => {
      // 1️⃣ Shift existing lessons down
      await tx.lesson.updateMany({
        where: {
          levelId: levelId,
          order: { gte: order },
        },
        data: {
          order: { increment: 1 },
        },
      });

      // 2️⃣ Insert new lesson
      return tx.lesson.create({
        data: {
          title: title,
          content: content || '',
          order: order,
          levelId: levelId,
          description: description,
        },
      });
    });
  }
}
