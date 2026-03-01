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
exports.GenerateExercisesInput = exports.Exercise = void 0;
const graphql_1 = require("@nestjs/graphql");
const excerciseType_enum_1 = require("../../../common/enums/excerciseType.enum");
const class_validator_1 = require("class-validator");
let Exercise = class Exercise {
};
exports.Exercise = Exercise;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Exercise.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Exercise.prototype, "lessonId", void 0);
__decorate([
    (0, graphql_1.Field)(() => excerciseType_enum_1.ExcerciseType),
    __metadata("design:type", String)
], Exercise.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Exercise.prototype, "question", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Exercise.prototype, "audioFile", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Exercise.prototype, "hint", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Exercise.prototype, "createdAt", void 0);
exports.Exercise = Exercise = __decorate([
    (0, graphql_1.ObjectType)()
], Exercise);
let GenerateExercisesInput = class GenerateExercisesInput {
};
exports.GenerateExercisesInput = GenerateExercisesInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GenerateExercisesInput.prototype, "lessonId", void 0);
__decorate([
    (0, graphql_1.Field)(() => excerciseType_enum_1.ExcerciseType, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(excerciseType_enum_1.ExcerciseType),
    __metadata("design:type", String)
], GenerateExercisesInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50) // prevent abuse
    ,
    __metadata("design:type", Number)
], GenerateExercisesInput.prototype, "count", void 0);
exports.GenerateExercisesInput = GenerateExercisesInput = __decorate([
    (0, graphql_1.InputType)()
], GenerateExercisesInput);
