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
exports.UpdateLevelInput = exports.CreateLevelInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const levelName_enum_js_1 = require("../../../common/enums/levelName.enum.js");
let CreateLevelInput = class CreateLevelInput {
};
exports.CreateLevelInput = CreateLevelInput;
__decorate([
    (0, graphql_1.Field)(() => levelName_enum_js_1.LevelName),
    (0, class_validator_1.IsEnum)(levelName_enum_js_1.LevelName),
    __metadata("design:type", String)
], CreateLevelInput.prototype, "code", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateLevelInput.prototype, "position", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateLevelInput.prototype, "courseId", void 0);
exports.CreateLevelInput = CreateLevelInput = __decorate([
    (0, graphql_1.InputType)()
], CreateLevelInput);
let UpdateLevelInput = class UpdateLevelInput {
};
exports.UpdateLevelInput = UpdateLevelInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateLevelInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => levelName_enum_js_1.LevelName, { nullable: true }),
    (0, class_validator_1.IsEnum)(levelName_enum_js_1.LevelName),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLevelInput.prototype, "code", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateLevelInput.prototype, "position", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateLevelInput.prototype, "courseId", void 0);
exports.UpdateLevelInput = UpdateLevelInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateLevelInput);
