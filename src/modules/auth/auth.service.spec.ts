import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: {
    user: {
      create: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
    };
  };
  let jwtService: { signAsync: jest.Mock };

  beforeAll(() => {
    process.env.JWT_ACCESS_SECRET = 'access-secret';
    process.env.JWT_REFRESH_SECRET = 'refresh-secret';
    process.env.JWT_ACCESS_EXPIRES = '15m';
    process.env.JWT_REFRESH_EXPIRES = '7d';
  });

  beforeEach(async () => {
    prisma = {
      user: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };

    jwtService = {
      signAsync: jest.fn(),
    };

    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-value' as unknown as never);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as unknown as never);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('register', () => {
    it('should hash password and create a user', async () => {
      prisma.user.create.mockResolvedValue({ id: 1, email: 'a@b.com' });

      const user = await service.register('a@b.com', 'plain-pass');

      expect(bcrypt.hash).toHaveBeenCalledWith('plain-pass', 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'a@b.com',
          password: 'hashed-value',
        },
      });
      expect(user).toEqual({ id: 1, email: 'a@b.com' });
    });
  });

  describe('login', () => {
    it('should throw UnauthorizedException when user is not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.login('missing@b.com', 'any')).rejects.toThrow('Invalid credentials');
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 2, email: 'a@b.com', password: 'stored', role: Role.USER });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login('a@b.com', 'wrong')).rejects.toThrow('Invalid credentials');
    });

    it('should return tokens and update hashed refresh token on success', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 3, email: 'a@b.com', password: 'stored', role: Role.USER });
      // generateTokens -> two signAsync calls (access, refresh)
      jwtService.signAsync
        .mockResolvedValueOnce('access.token')
        .mockResolvedValueOnce('refresh.token');

      // for updating stored refresh token, bcrypt.hash is called again with refresh token
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashed-value').mockResolvedValueOnce('hashed-refresh');

      const tokens = await service.login('a@b.com', 'correct');

      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(tokens).toEqual({ accessToken: 'access.token', refreshToken: 'refresh.token' });
      expect(bcrypt.hash).toHaveBeenLastCalledWith('refresh.token', 10);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 3 },
        data: { refreshToken: 'hashed-refresh' },
      });
    });
  });

  describe('refreshTokens', () => {
    it('should throw when user is not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.refreshTokens(1, 'rt')).rejects.toThrow();
    });

    it('should throw when user has no stored refresh token', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 1, email: 'a@b.com', password: 'p', role: Role.USER, refreshToken: null });

      await expect(service.refreshTokens(1, 'rt')).rejects.toThrow();
    });

    it('should throw when provided refresh token does not match stored hash', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 1, email: 'a@b.com', password: 'p', role: Role.USER, refreshToken: 'stored-hash' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.refreshTokens(1, 'rt')).rejects.toThrow();
      expect(bcrypt.compare).toHaveBeenCalledWith('rt', 'stored-hash');
    });

    it('should return new tokens when refresh token is valid', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 10, email: 'a@b.com', password: 'p', role: Role.USER, refreshToken: 'stored-hash' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.signAsync
        .mockResolvedValueOnce('new.access')
        .mockResolvedValueOnce('new.refresh');

      const tokens = await service.refreshTokens(10, 'provided-rt');

      expect(bcrypt.compare).toHaveBeenCalledWith('provided-rt', 'stored-hash');
      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(tokens).toEqual({ accessToken: 'new.access', refreshToken: 'new.refresh' });
    });
  });
});
