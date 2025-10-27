import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from './create-user.input';
import { LoginInput } from './login.input';


@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // ✅ Now accepts a DTO (object)
  async createUser(input: CreateUserInput) {
    const email = input.email.toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });

    if (existing) throw new ConflictException('User with this email already exists');

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name:input.name,
        currentLevel: input.currentLevel,
      },
    });
console.log(user,"bbjhjj")
    return this.stripPassword(user);
  }

  // ✅ New login method
  async login(input: LoginInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });

    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwtService.signAsync(
      { userId: user.id, email: user.email },
      { expiresIn: '1d' },
    );

    return { token, user: this.stripPassword(user),name: user.name };
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    return user ? this.stripPassword(user) : null;
  }

  async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.stripPassword(user) : null;
  }

  private stripPassword(user: any) {
    const { password, ...rest } = user;
    return rest;
  }
}
