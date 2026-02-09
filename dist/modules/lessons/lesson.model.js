"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
const graphql_1 = require("@nestjs/graphql");
const vocabulary_model_1 = require("../vocabulary/vocabulary.model");
const example_model_1 = require("../examples/example.model");
let Lesson = class Lesson {
};
exports.Lesson = Lesson;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Lesson.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Lesson.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Lesson.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Lesson.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Lesson.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Lesson.prototype, "levelId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Object)
], Lesson.prototype, "moduleId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [vocabulary_model_1.Vocabulary], { nullable: true }),
    __metadata("design:type", Object)
], Lesson.prototype, "vocabulary", void 0);
__decorate([
    (0, graphql_1.Field)(() => [example_model_1.Example], { nullable: true }),
    __metadata("design:type", Object)
], Lesson.prototype, "examples", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Lesson.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Lesson.prototype, "updatedAt", void 0);
exports.Lesson = Lesson = __decorate([
    (0, graphql_1.ObjectType)()
], Lesson);
