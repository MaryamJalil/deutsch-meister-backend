import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CourseService } from './courses.service';

// Mock the drizzle db module
const mockReturning = jest.fn();
const mockWhere = jest.fn();
const mockSet = jest.fn();
const mockValues = jest.fn();
const mockFrom = jest.fn();

const mockDb = {
  insert: jest.fn().mockReturnValue({
    values: mockValues.mockReturnValue({
      returning: mockReturning,
    }),
  }),
  update: jest.fn().mockReturnValue({
    set: mockSet.mockReturnValue({
      where: mockWhere.mockReturnValue({
        returning: mockReturning,
      }),
    }),
  }),
  select: jest.fn().mockReturnValue({
    from: mockFrom.mockReturnValue({
      where: mockWhere,
    }),
  }),
};

jest.mock('../../database/drizzle', () => ({
  db: mockDb,
}));

jest.mock('drizzle-orm', () => ({
  eq: jest.fn((col, val) => ({ col, val })),
  isNull: jest.fn((col) => ({ col })),
}));

jest.mock('../../database/schema/course.schema', () => ({
  courses: { id: 'id', title: 'title', language: 'language', deletedAt: 'deletedAt' },
}));

describe('CourseService', () => {
  let service: CourseService;

  const mockCourse = {
    id: 1,
    title: 'German A1',
    language: 'German',
    createdAt: new Date('2024-01-01'),
    deletedAt: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseService],
    }).compile();

    service = module.get<CourseService>(CourseService);
    jest.clearAllMocks();

    // Re-setup chained mock returns after clearing
    mockDb.insert.mockReturnValue({ values: mockValues });
    mockValues.mockReturnValue({ returning: mockReturning });

    mockDb.update.mockReturnValue({ set: mockSet });
    mockSet.mockReturnValue({ where: mockWhere });
    mockWhere.mockReturnValue({ returning: mockReturning });

    mockDb.select.mockReturnValue({ from: mockFrom });
    mockFrom.mockReturnValue({ where: mockWhere });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCourse', () => {
    it('should create and return a course', async () => {
      mockReturning.mockResolvedValue([mockCourse]);

      const result = await service.createCourse({
        title: 'German A1',
        language: 'German',
      });

      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockValues).toHaveBeenCalledWith({
        title: 'German A1',
        language: 'German',
      });
      expect(result).toEqual(mockCourse);
    });
  });

  describe('updateCourse', () => {
    it('should update and return the course when it exists', async () => {
      const updatedCourse = { ...mockCourse, title: 'German A2' };
      mockReturning.mockResolvedValue([updatedCourse]);

      const result = await service.updateCourse({ id: 1, title: 'German A2' });

      expect(mockDb.update).toHaveBeenCalled();
      expect(mockSet).toHaveBeenCalledWith({ title: 'German A2' });
      expect(result).toEqual(updatedCourse);
    });

    it('should update both title and language when both are provided', async () => {
      const updatedCourse = { ...mockCourse, title: 'German B1', language: 'Deutsch' };
      mockReturning.mockResolvedValue([updatedCourse]);

      const result = await service.updateCourse({
        id: 1,
        title: 'German B1',
        language: 'Deutsch',
      });

      expect(mockSet).toHaveBeenCalledWith({ title: 'German B1', language: 'Deutsch' });
      expect(result).toEqual(updatedCourse);
    });

    it('should update only language when only language is provided', async () => {
      const updatedCourse = { ...mockCourse, language: 'Deutsch' };
      mockReturning.mockResolvedValue([updatedCourse]);

      await service.updateCourse({ id: 1, language: 'Deutsch' });

      expect(mockSet).toHaveBeenCalledWith({ language: 'Deutsch' });
    });

    it('should throw NotFoundException when course does not exist', async () => {
      mockReturning.mockResolvedValue([]);

      await expect(service.updateCourse({ id: 999, title: 'X' })).rejects.toThrow(
        new NotFoundException('Course with id 999 not found'),
      );
    });
  });

  describe('deleteCourse', () => {
    it('should soft-delete and return the course when it exists', async () => {
      const deletedCourse = { ...mockCourse, deletedAt: new Date() };
      mockReturning.mockResolvedValue([deletedCourse]);

      const result = await service.deleteCourse(1);

      expect(mockDb.update).toHaveBeenCalled();
      expect(mockSet).toHaveBeenCalledWith(
        expect.objectContaining({ deletedAt: expect.any(Date) }),
      );
      expect(result).toEqual(deletedCourse);
      expect(result.deletedAt).not.toBeNull();
    });

    it('should throw NotFoundException when course does not exist', async () => {
      mockReturning.mockResolvedValue([]);

      await expect(service.deleteCourse(999)).rejects.toThrow(
        new NotFoundException('Course with id 999 not found'),
      );
    });
  });

  describe('getCourses', () => {
    it('should return all non-deleted courses', async () => {
      const courseList = [mockCourse, { ...mockCourse, id: 2, title: 'German B1' }];
      mockWhere.mockResolvedValue(courseList);

      const result = await service.getCourses();

      expect(mockDb.select).toHaveBeenCalled();
      expect(mockFrom).toHaveBeenCalled();
      expect(result).toEqual(courseList);
    });

    it('should return an empty array when no courses exist', async () => {
      mockWhere.mockResolvedValue([]);

      const result = await service.getCourses();

      expect(result).toEqual([]);
    });
  });

  describe('getCourse', () => {
    it('should return the course when it exists', async () => {
      mockWhere.mockResolvedValue([mockCourse]);

      const result = await service.getCourse(1);

      expect(mockDb.select).toHaveBeenCalled();
      expect(result).toEqual(mockCourse);
    });

    it('should throw NotFoundException when course does not exist', async () => {
      mockWhere.mockResolvedValue([]);

      await expect(service.getCourse(999)).rejects.toThrow(
        new NotFoundException('Course with id 999 not found'),
      );
    });
  });
});
