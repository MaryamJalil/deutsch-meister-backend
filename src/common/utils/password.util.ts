import * as bcrypt from 'bcrypt';
import { BCRYPT_ROUNDS } from '../constants.js';

export class PasswordUtil {
  /**
   * Hashes a plain text password
   */
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  /**
   * Compares a plain text password with a hashed password
   */
  static async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

