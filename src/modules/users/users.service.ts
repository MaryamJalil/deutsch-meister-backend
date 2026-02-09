import { Injectable } from '@nestjs/common';
import { db } from '../../database/drizzle';
import { users } from '../../database/schema/user.schema';

@Injectable()
export class UsersService {
  async findAll() {
    return db.select().from(users);
  }
}
