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
const drizzle_js_1 = require("../../database/drizzle.js");
const level_schema_js_1 = require("../../database/schema/level.schema.js");
const index_js_1 = require("../../../node_modules/drizzle-orm/index.js");
let LevelService = class LevelService {
    async createLevel(input) {
        const [level] = await drizzle_js_1.db
            .insert(level_schema_js_1.levels)
            .values({
            code: input.code,
            position: input.position,
            courseId: input.courseId,
        })
            .returning();
        return level;
    }
    async updateLevel(input) {
        const { id, ...data } = input;
        const updatedLevel = await drizzle_js_1.db
            .update(level_schema_js_1.levels)
            .set(data)
            .where((0, index_js_1.eq)(level_schema_js_1.levels.id, id))
            .returning();
        return updatedLevel;
    }
    async getLevels() {
        const allLevels = await drizzle_js_1.db.select().from(level_schema_js_1.levels);
        if (!allLevels) {
            throw new common_1.NotFoundException('Levels not found');
        }
        return level_schema_js_1.levels;
    }
    async getLevel(id) {
        const level = await drizzle_js_1.db.select().from(level_schema_js_1.levels).where((0, index_js_1.eq)(level_schema_js_1.levels.id, id));
        if (!level) {
            throw new common_1.NotFoundException('Level not found');
        }
        return level;
    }
};
exports.LevelService = LevelService;
exports.LevelService = LevelService = __decorate([
    (0, common_1.Injectable)()
], LevelService);
