import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCourseInput } from './create-course.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async createCourse(input: CreateCourseInput) {
    return this.prisma.course.create({
      data: {
        title: input.title,
        description: input.description ?? null,
        hours: input.hours ?? 0, // Changed from null to 0
        lessonCount: input.lessonCount ?? 0, // Changed from null to 0
        features: input.features ?? [],
        levelId: input.levelId,
      },
      include: {
        level: true,
      },
    });
  }

  async findCourses() {
    return this.prisma.course.findMany({
      include: {
        level: true,
        lessons: {
          orderBy: {
            order: 'asc' as Prisma.SortOrder,
          },
        },
      },
      orderBy: {
        createdAt: 'asc' as Prisma.SortOrder,
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
            order: 'asc' as Prisma.SortOrder,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async getCourseByLevel(slug: string) {
    const course = await this.prisma.course.findFirst({
      where: { 
        level: { 
          slug: slug 
        } 
      },
      include: {
        level: true,
        lessons: {
          include: { 
            audio: {
              // If 'order' field doesn't exist, use 'createdAt' instead
              orderBy: { createdAt: 'asc' as Prisma.SortOrder }
            }
          },
          orderBy: { order: 'asc' as Prisma.SortOrder },
        },
      },
    });

    if (!course) {
      return null;
    }

    // Map audio to audioFiles for GraphQL
    return {
      ...course,
      lessons: course.lessons.map(lesson => ({
        ...lesson,
        audioFiles: lesson.audio.map(audio => ({
          ...audio,
          fileName: audio.filename,
        })),
      })),
    };
  }
}