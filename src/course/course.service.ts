import { Injectable, NotFoundException } from '@nestjs/common';
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

// src/course/course.service.ts
async findCourses() {
  return this.prisma.course.findMany({
    include: {
      level: true,
      lessons: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
}

async findCourseById(id: number) {
  const course = await this.prisma.course.findUnique({
    where: { id },
    include: {
      level: true,
      lessons: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });

  if (!course) {
    throw new NotFoundException(`Course with ID ${id} not found`);
  }

  return course;
}
}
