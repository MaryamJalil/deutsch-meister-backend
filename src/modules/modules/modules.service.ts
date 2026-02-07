import { Injectable, NotFoundException } from '@nestjs/common';
import { modules } from '../../database/schema/module.schema.js';
import { db } from '../../database/drizzle.js';
import {
  CreateModuleInput,
  UpdateModuleInput,
} from '../auth/dto/modules.input.js';
import { eq } from 'drizzle-orm/index.js';

@Injectable()
export class ModuleService {
  async createModule(input: CreateModuleInput) {
    const [module] = await db
      .insert(modules)
      .values({
        title: input.title,
        order: input.order,
        levelId: input.levelId,
      })
      .returning();

    return module;
  }
  async updateeModule(input: UpdateModuleInput) {
    const [module] = await db
      .update(modules)
      .set({
        title: input.title,
        order: input.order,
      })
      .where(eq(modules.id, input.id))
      .returning();
    if (!module) {
      throw new NotFoundException('Module Not Found');
    }
    return module;
  }
  async getModules() {
    const aLLmODULES = await db.select().from(modules);
    if (!aLLmODULES) {
      throw new NotFoundException('Modules not found');
    }
    return aLLmODULES;
  }
  async getModule(id: number) {
    const module = await db.select().from(modules).where(eq(modules.id, id));
    if (!module) {
      throw new NotFoundException('Module not found');
    }
    return module[0];
  }
}
