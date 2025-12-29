import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLevelInput, UpdateLevelInput } from './level.input';

@Injectable()
export class LevelService {
  constructor(private readonly prisma: PrismaService) {}

  async createLevel(input: CreateLevelInput) {
    return this.prisma.level.create({
      data: {
        slug: input.slug,
        title: input.title,
        order: input.order,
      },
    });
  }

  async updateLevel(input: UpdateLevelInput) {
    const { id, ...updateData } = input;
    return this.prisma.level.update({
      where: { id },
      data: updateData,
    });
  }
  async findAllLevels() {
    return this.prisma.level.findMany({
      include: { courses: true },
    });
  }
  async findLevelById(id: number) {
    return this.prisma.level.findUnique({ where: { id } });
  }
}
