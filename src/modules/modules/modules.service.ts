import { Injectable, NotFoundException } from '@nestjs/common';
import { modules } from '../../database/schema/module.schema';
import { db } from '../../database/drizzle';
import { CreateModuleInput, UpdateModuleInput } from '../auth/dto/modules.input';
import { eq, and, isNull } from 'drizzle-orm';

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

  async updateModule(input: UpdateModuleInput) {
    const updateData: Record<string, unknown> = {};
    if (input.title !== undefined) updateData.title = input.title;
    if (input.order !== undefined) updateData.order = input.order;

    const [updatedModule] = await db
      .update(modules)
      .set(updateData)
      .where(eq(modules.id, input.id))
      .returning();

    if (!updatedModule) {
      throw new NotFoundException(`Module with id ${input.id} not found`);
    }
    return updatedModule;
  }

  async deleteModule(id: number) {
    const [deleted] = await db
      .update(modules)
      .set({ deletedAt: new Date() })
      .where(eq(modules.id, id))
      .returning();

    if (!deleted) {
      throw new NotFoundException(`Module with id ${id} not found`);
    }
    return deleted;
  }

  async getModules() {
    return db.select().from(modules).where(isNull(modules.deletedAt));
  }

  async getModule(id: number) {
    const [module] = await db
      .select()
      .from(modules)
      .where(eq(modules.id, id));

    if (!module) {
      throw new NotFoundException(`Module with id ${id} not found`);
    }
    return module;
  }

  async getModulesByLevel(levelId: number) {
    return db
      .select()
      .from(modules)
      .where(and(eq(modules.levelId, levelId), isNull(modules.deletedAt)));
  }
}
