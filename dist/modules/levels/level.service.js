"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_1 = require("../../database/drizzle");
const level_schema_1 = require("../../database/schema/level.schema");
const drizzle_orm_1 = require("drizzle-orm");
let LevelService = class LevelService {
    async createLevel(input) {
        const [level] = await drizzle_1.db
            .insert(level_schema_1.levels)
            .values({
            code: input.code,
            position: input.position,
            courseId: input.courseId,
        })
            .returning();
        return level;
    }
    async updateLevel(input) {
        const { id, ...rest } = input;
        const updateData = {};
        if (rest.code !== undefined)
            updateData.code = rest.code;
        if (rest.position !== undefined)
            updateData.position = rest.position;
        if (rest.courseId !== undefined)
            updateData.courseId = rest.courseId;
        const [updatedLevel] = await drizzle_1.db
            .update(level_schema_1.levels)
            .set(updateData)
            .where((0, drizzle_orm_1.eq)(level_schema_1.levels.id, id))
            .returning();
        if (!updatedLevel) {
            throw new common_1.NotFoundException(`Level with id ${id} not found`);
        }
        return updatedLevel;
    }
    async deleteLevel(id) {
        const [deleted] = await drizzle_1.db
            .update(level_schema_1.levels)
            .set({ deletedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(level_schema_1.levels.id, id))
            .returning();
        if (!deleted) {
            throw new common_1.NotFoundException(`Level with id ${id} not found`);
        }
        return deleted;
    }
    async getLevels() {
        return drizzle_1.db.select().from(level_schema_1.levels).where((0, drizzle_orm_1.isNull)(level_schema_1.levels.deletedAt));
    }
    async getLevel(id) {
        const [level] = await drizzle_1.db
            .select()
            .from(level_schema_1.levels)
            .where((0, drizzle_orm_1.eq)(level_schema_1.levels.id, id));
        if (!level) {
            throw new common_1.NotFoundException(`Level with id ${id} not found`);
        }
        return level;
    }
    async getLevelsByCourse(courseId) {
        return drizzle_1.db
            .select()
            .from(level_schema_1.levels)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(level_schema_1.levels.courseId, courseId), (0, drizzle_orm_1.isNull)(level_schema_1.levels.deletedAt)));
    }
};
exports.LevelService = LevelService;
exports.LevelService = LevelService = __decorate([
    (0, common_1.Injectable)()
], LevelService);
