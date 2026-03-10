import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CoursesResolver } from './courses.resolver';
import { CourseService } from './courses.service';

// Bypass auth guards for unit tests
jest.mock('../auth/guards/gql-auth.guard', () => ({
  GqlAuthGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn().mockReturnValue(true),
  })),
}));

jest.mock('../auth/guards/roles.guard', () => ({
  RolesGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn().mockReturnValue(true),
  })),
}));

describe('CoursesResolver', () => {
  let resolver: CoursesResolver;
  let courseService: jest.Mocked<CourseService>;

  const mockCourse = {
    id: 1,
    title: 'German A1',
    language: 'German',
    createdAt: new Date('2024-01-01'),
    deletedAt: null,
  };

  const mockCourseService = {
    createCourse: jest.fn(),
    updateCourse: jest.fn(),
    deleteCourse: jest.fn(),
    getCourses: jest.fn(),
    getCourse: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesResolver,
        { provide: CourseService, useValue: mockCourseService },
      ],
    }).compile();

    resolver = module.get<CoursesResolver>(CoursesResolver);
    courseService = module.get(CourseService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createCourse', () => {
    it('should call service.createCourse and return the result', async () => {
      courseService.createCourse.mockResolvedValue(mockCourse);

      const input = { title: 'German A1', language: 'German' };
      const result = await resolver.createCourse(input);

      expect(courseService.createCourse).toHaveBeenCalledWith(input);
      expect(courseService.createCourse).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCourse);
    });
  });

  describe('updateCourse', () => {
    it('should call service.updateCourse and return the updated course', async () => {
      const updatedCourse = { ...mockCourse, title: 'German A2' };
      courseService.updateCourse.mockResolvedValue(updatedCourse);

      const input = { id: 1, title: 'German A2' };
      const result = await resolver.updateCourse(input);

      expect(courseService.updateCourse).toHaveBeenCalledWith(input);
      expect(result).toEqual(updatedCourse);
    });

    it('should propagate NotFoundException from service', async () => {
      courseService.updateCourse.mockRejectedValue(
        new NotFoundException('Course with id 999 not found'),
      );

      await expect(resolver.updateCourse({ id: 999, title: 'X' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteCourse', () => {
    it('should call service.deleteCourse with the given id and return deleted course', async () => {
      const deletedCourse = { ...mockCourse, deletedAt: new Date() };
      courseService.deleteCourse.mockResolvedValue(deletedCourse);

      const result = await resolver.deleteCourse(1);

      expect(courseService.deleteCourse).toHaveBeenCalledWith(1);
      expect(courseService.deleteCourse).toHaveBeenCalledTimes(1);
      expect(result).toEqual(deletedCourse);
    });

    it('should propagate NotFoundException from service', async () => {
      courseService.deleteCourse.mockRejectedValue(
        new NotFoundException('Course with id 999 not found'),
      );

      await expect(resolver.deleteCourse(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getCourses', () => {
    it('should call service.getCourses and return a list of courses', async () => {
      const courseList = [mockCourse, { ...mockCourse, id: 2, title: 'German B1' }];
      courseService.getCourses.mockResolvedValue(courseList);

      const result = await resolver.getCourses();

      expect(courseService.getCourses).toHaveBeenCalledTimes(1);
      expect(result).toEqual(courseList);
      expect(result).toHaveLength(2);
    });

    it('should return an empty array when no courses exist', async () => {
      courseService.getCourses.mockResolvedValue([]);

      const result = await resolver.getCourses();

      expect(result).toEqual([]);
    });
  });

  describe('getCourse', () => {
    it('should call service.getCourse with the given id and return the course', async () => {
      courseService.getCourse.mockResolvedValue(mockCourse);

      const result = await resolver.getCourse(1);

      expect(courseService.getCourse).toHaveBeenCalledWith(1);
      expect(courseService.getCourse).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCourse);
    });

    it('should propagate NotFoundException from service', async () => {
      courseService.getCourse.mockRejectedValue(
        new NotFoundException('Course with id 999 not found'),
      );

      await expect(resolver.getCourse(999)).rejects.toThrow(
        new NotFoundException('Course with id 999 not found'),
      );
    });
  });
});
