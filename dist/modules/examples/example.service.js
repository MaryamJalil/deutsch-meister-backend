"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_1 = require("../../database/drizzle");
const example_schema_1 = require("../../database/schema/example.schema");
const drizzle_orm_1 = require("drizzle-orm");
let ExampleService = class ExampleService {
    async createExample(input) {
        const [example] = await drizzle_1.db
            .insert(example_schema_1.examples)
            .values({
            sentence: input.sentence,
            translation: input.translation,
            lessonId: input.lessonId,
        })
            .returning();
        return example;
    }
    async updateExample(input) {
        const updateData = {};
        if (input.sentence !== undefined)
            updateData.sentence = input.sentence;
        if (input.translation !== undefined)
            updateData.translation = input.translation;
        if (input.lessonId !== undefined)
            updateData.lessonId = input.lessonId;
        const [updatedExample] = await drizzle_1.db
            .update(example_schema_1.examples)
            .set(updateData)
            .where((0, drizzle_orm_1.eq)(example_schema_1.examples.id, input.id))
            .returning();
        if (!updatedExample) {
            throw new common_1.NotFoundException(`Example with id ${input.id} not found`);
        }
        return updatedExample;
    }
    async deleteExample(id) {
        const [deletedExample] = await drizzle_1.db
            .delete(example_schema_1.examples)
            .where((0, drizzle_orm_1.eq)(example_schema_1.examples.id, id))
            .returning();
        if (!deletedExample) {
            throw new common_1.NotFoundException(`Example with id ${id} not found`);
        }
        return deletedExample;
    }
    async getExamples() {
        return drizzle_1.db.select().from(example_schema_1.examples);
    }
    async getExample(id) {
        const [example] = await drizzle_1.db
            .select()
            .from(example_schema_1.examples)
            .where((0, drizzle_orm_1.eq)(example_schema_1.examples.id, id));
        if (!example) {
            throw new common_1.NotFoundException(`Example with id ${id} not found`);
        }
        return example;
    }
    async getExamplesByLesson(lessonId) {
        return drizzle_1.db
            .select()
            .from(example_schema_1.examples)
            .where((0, drizzle_orm_1.eq)(example_schema_1.examples.lessonId, lessonId));
    }
};
exports.ExampleService = ExampleService;
exports.ExampleService = ExampleService = __decorate([
    (0, common_1.Injectable)()
], ExampleService);
