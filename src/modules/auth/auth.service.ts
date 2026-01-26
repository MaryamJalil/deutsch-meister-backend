import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { db } from '../../database/drizzle.js';
import { users } from '../../database/schema/user.schema.js';
import { JwtPayload } from './interfaces/jwt-payload.interface.js';
import { Role } from '../../common/enums/role.enum.js';
import { eq } from 'drizzle-orm/index.js';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  // --------------------
  async register(email: string, password: string, role: Role) {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        role,
      })
      .returning({
        id: users.id,
        role: users.role,
      });

    return this.generateTokens(user.id, user.role as Role);
  }
  async login(email: string, password: string) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    const user = result[0];
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id, user.role as Role);

    // store HASHED refresh token
    await db
      .update(users)
      .set({
        refreshToken: await bcrypt.hash(tokens.refreshToken, 10),
      })
      .where(eq(users.id, user.id));

    return tokens;
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    const user = result[0];

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException();
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    return this.generateTokens(user.id, user.role as Role);
  }

  private async generateTokens(userId: number, role: Role) {
    const payload: JwtPayload = {
      sub: userId,
      role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET!,
      expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m',
    } as JwtSignOptions);

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET!,
      expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
    } as JwtSignOptions);

    return { accessToken, refreshToken };
  }
}
