import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import {
  CreateLevelInput,
  UpdateLevelInput,
} from '../auth/dto/levels.input.js';
import { Level } from './level.model.js';
import { LevelName } from '../../common/enums/levelName.enum.js';

@Injectable()
export class LevelService {
  constructor(private readonly prisma: PrismaService) {}

  async createLevel(input: CreateLevelInput) {
    console.log('DEBUG input.code =', input); // 👈 ADD THIS

    return this.prisma.level.create({
      data: {
        code: input.code,
        position: input.position,
        courseId: input.courseId,
      },
    });
  }

  async updateLevel(input: UpdateLevelInput) {
    const { id, ...data } = input;

    if (data.code) {
      data.code = data.code as LevelName;
    }

    return this.prisma.level.update({
      where: { id },
      data,
    });
  }
  async getLevels() {
    return this.prisma.level.findMany();
  }
  async getLevel(id: number) {
    return this.prisma.level.findUnique({
      where: { id },
    });
  }
}
