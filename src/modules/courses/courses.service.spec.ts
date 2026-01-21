import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './courses.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('CourseService', () => {
  let service: CourseService;
  let prisma: { course: { create: jest.Mock; update: jest.Mock } };

  beforeEach(async () => {
    prisma = {
      course: {
        create: jest.fn(),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  it('should create a course with title and language', async () => {
    prisma.course.create.mockResolvedValue({ id: 1, title: 'A1', language: 'de' });

    const created = await service.createCourse('A1', 'de');

    expect(prisma.course.create).toHaveBeenCalledWith({
      data: { title: 'A1', language: 'de' },
    });
    expect(created).toEqual({ id: 1, title: 'A1', language: 'de' });
  });

  it('should update a course with provided fields', async () => {
    prisma.course.update.mockResolvedValue({ id: 2, title: 'Updated', description: 'Desc' });

    const updated = await service.updateCourse(2, { title: 'Updated', description: 'Desc' });

    expect(prisma.course.update).toHaveBeenCalledWith({
      where: { id: 2 },
      data: { title: 'Updated', description: 'Desc' },
    });
    expect(updated).toEqual({ id: 2, title: 'Updated', description: 'Desc' });
  });
});
