import { Injectable, NotFoundException } from '@nestjs/common/index.js';
import { UpdateCourseInput } from '../auth/dto/course.input.js';
import { courses } from '../../database/schema/course.schema.js';
import { db } from '../../database/drizzle.js';
import { eq } from 'drizzle-orm/index.js';

@Injectable()
export class CourseService {
  async createCourse(title: string, language: string) {
    const [course] = await db
      .insert(courses)
      .values({
        title,
        language,
      })
      .returning();
    return course;
  }
  async updateCourse(input: UpdateCourseInput) {
    const [updatedCourse] = await db
      .update(courses)
      .set({
        title: input.title,
        language: input.language,
      })
      .where(eq(courses.id, input.id))
      .returning();
    if (!updatedCourse) {
      throw new NotFoundException('Course not found');
    }
    return updatedCourse;
  }
  async getCourses() {
    const course = await db.select().from(courses);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }
  async getCourse(id: number) {
    const course = await db.select().from(courses).where(eq(courses.id, id));
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course[0];
  }
}
