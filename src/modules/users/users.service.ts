import { Injectable } from '@nestjs/common';
import { db } from '../../database/drizzle.js';
import { users } from '../../database/schema/user.schema.js';

@Injectable()
export class UsersService {
  async findAll() {
    return db.select().from(users);
  }
}
