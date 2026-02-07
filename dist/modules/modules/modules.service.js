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
const module_schema_js_1 = require("../../database/schema/module.schema.js");
const drizzle_js_1 = require("../../database/drizzle.js");
const index_js_1 = require("../../../node_modules/drizzle-orm/index.js");
let ModuleService = class ModuleService {
    async createModule(input) {
        const [module] = await drizzle_js_1.db
            .insert(module_schema_js_1.modules)
            .values({
            title: input.title,
            order: input.order,
            levelId: input.levelId,
        })
            .returning();
        return module;
    }
    async updateeModule(input) {
        const [module] = await drizzle_js_1.db
            .update(module_schema_js_1.modules)
            .set({
            title: input.title,
            order: input.order,
        })
            .where((0, index_js_1.eq)(module_schema_js_1.modules.id, input.id))
            .returning();
        if (!module) {
            throw new common_1.NotFoundException('Module Not Found');
        }
        return module;
    }
    async getModules() {
        const aLLmODULES = await drizzle_js_1.db.select().from(module_schema_js_1.modules);
        if (!aLLmODULES) {
            throw new common_1.NotFoundException('Modules not found');
        }
        return aLLmODULES;
    }
    async getModule(id) {
        const module = await drizzle_js_1.db.select().from(module_schema_js_1.modules).where((0, index_js_1.eq)(module_schema_js_1.modules.id, id));
        if (!module) {
            throw new common_1.NotFoundException('Module not found');
        }
        return module[0];
    }
};
exports.ModuleService = ModuleService;
exports.ModuleService = ModuleService = __decorate([
    (0, common_1.Injectable)()
], ModuleService);
