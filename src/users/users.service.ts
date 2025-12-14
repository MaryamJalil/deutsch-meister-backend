import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { PasswordUtil } from '../common/utils/password.util.js';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from './dto/create-user.input.js';
import { LoginInput } from './dto/login.input.js';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Creates a new user with hashed password
   */
  async createUser(input: CreateUserInput) {
    const lowerCaseEmail = input.email.toLowerCase();

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: lowerCaseEmail },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await PasswordUtil.hash(input.password);

    // Create the user
    const user = await this.prisma.user.create({
      data: {
        email: lowerCaseEmail,
        password: hashedPassword,
        name: input.name,
        currentLevel: input.currentLevel,
      },
    });

    // Return user without password
    return this.excludePassword(user);
  }

  /**
   * Login user and return JWT token with user data
   */
  async login(input: LoginInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await PasswordUtil.compare(input.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ userId: user.id });

    return {
      token,
      user: this.excludePassword(user),
    };
  }

  /**
   * Finds a user by email (excludes password by default)
   */
  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return null;
    }

    return this.excludePassword(user);
  }

  /**
   * Finds a user by ID
   */
  async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.excludePassword(user);
  }

  /**
   * Excludes password from user object
   */
  private excludePassword<T extends { password: string }>(user: T): Omit<T, 'password'> {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
