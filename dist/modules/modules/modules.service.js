"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleService = void 0;
const common_1 = require("@nestjs/common");
const module_schema_1 = require("../../database/schema/module.schema");
const drizzle_1 = require("../../database/drizzle");
const drizzle_orm_1 = require("drizzle-orm");
let ModuleService = class ModuleService {
    async createModule(input) {
        const [module] = await drizzle_1.db
            .insert(module_schema_1.modules)
            .values({
            title: input.title,
            order: input.order,
            levelId: input.levelId,
        })
            .returning();
        return module;
    }
    async updateModule(input) {
        const updateData = {};
        if (input.title !== undefined)
            updateData.title = input.title;
        if (input.order !== undefined)
            updateData.order = input.order;
        const [updatedModule] = await drizzle_1.db
            .update(module_schema_1.modules)
            .set(updateData)
            .where((0, drizzle_orm_1.eq)(module_schema_1.modules.id, input.id))
            .returning();
        if (!updatedModule) {
            throw new common_1.NotFoundException(`Module with id ${input.id} not found`);
        }
        return updatedModule;
    }
    async deleteModule(id) {
        const [deleted] = await drizzle_1.db
            .update(module_schema_1.modules)
            .set({ deletedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(module_schema_1.modules.id, id))
            .returning();
        if (!deleted) {
            throw new common_1.NotFoundException(`Module with id ${id} not found`);
        }
        return deleted;
    }
    async getModules() {
        return drizzle_1.db.select().from(module_schema_1.modules).where((0, drizzle_orm_1.isNull)(module_schema_1.modules.deletedAt));
    }
    async getModule(id) {
        const [module] = await drizzle_1.db
            .select()
            .from(module_schema_1.modules)
            .where((0, drizzle_orm_1.eq)(module_schema_1.modules.id, id));
        if (!module) {
            throw new common_1.NotFoundException(`Module with id ${id} not found`);
        }
        return module;
    }
    async getModulesByLevel(levelId) {
        return drizzle_1.db
            .select()
            .from(module_schema_1.modules)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(module_schema_1.modules.levelId, levelId), (0, drizzle_orm_1.isNull)(module_schema_1.modules.deletedAt)));
    }
};
exports.ModuleService = ModuleService;
exports.ModuleService = ModuleService = __decorate([
    (0, common_1.Injectable)()
], ModuleService);
