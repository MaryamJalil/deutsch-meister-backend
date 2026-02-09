import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseInput, UpdateCourseInput } from '../auth/dto/course.input';
import { courses } from '../../database/schema/course.schema';
import { db } from '../../database/drizzle';
import { eq, isNull } from 'drizzle-orm';

@Injectable()
export class CourseService {
  async createCourse(input: CreateCourseInput) {
    const [course] = await db
      .insert(courses)
      .values({
        title: input.title,
        language: input.language,
      })
      .returning();
    return course;
  }

  async updateCourse(input: UpdateCourseInput) {
    const updateData: Record<string, unknown> = {};
    if (input.title !== undefined) updateData.title = input.title;
    if (input.language !== undefined) updateData.language = input.language;

    const [updatedCourse] = await db
      .update(courses)
      .set(updateData)
      .where(eq(courses.id, input.id))
      .returning();

    if (!updatedCourse) {
      throw new NotFoundException(`Course with id ${input.id} not found`);
    }
    return updatedCourse;
  }

  async deleteCourse(id: number) {
    const [deleted] = await db
      .update(courses)
      .set({ deletedAt: new Date() })
      .where(eq(courses.id, id))
      .returning();

    if (!deleted) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return deleted;
  }

  async getCourses() {
    return db.select().from(courses).where(isNull(courses.deletedAt));
  }

  async getCourse(id: number) {
    const [course] = await db
      .select()
      .from(courses)
      .where(eq(courses.id, id));

    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return course;
  }
}
