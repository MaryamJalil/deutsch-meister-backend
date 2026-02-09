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
exports.CreateBulkVocabularyInput = exports.VocabularyItemInput = exports.UpdateVocabularyInput = exports.CreateVocabularyInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateVocabularyInput = class CreateVocabularyInput {
};
exports.CreateVocabularyInput = CreateVocabularyInput;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVocabularyInput.prototype, "word", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVocabularyInput.prototype, "meaning", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateVocabularyInput.prototype, "lessonId", void 0);
exports.CreateVocabularyInput = CreateVocabularyInput = __decorate([
    (0, graphql_1.InputType)()
], CreateVocabularyInput);
let UpdateVocabularyInput = class UpdateVocabularyInput {
};
exports.UpdateVocabularyInput = UpdateVocabularyInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateVocabularyInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVocabularyInput.prototype, "word", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVocabularyInput.prototype, "meaning", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateVocabularyInput.prototype, "lessonId", void 0);
exports.UpdateVocabularyInput = UpdateVocabularyInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateVocabularyInput);
let VocabularyItemInput = class VocabularyItemInput {
};
exports.VocabularyItemInput = VocabularyItemInput;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VocabularyItemInput.prototype, "word", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VocabularyItemInput.prototype, "meaning", void 0);
exports.VocabularyItemInput = VocabularyItemInput = __decorate([
    (0, graphql_1.InputType)()
], VocabularyItemInput);
let CreateBulkVocabularyInput = class CreateBulkVocabularyInput {
};
exports.CreateBulkVocabularyInput = CreateBulkVocabularyInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateBulkVocabularyInput.prototype, "lessonId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [VocabularyItemInput]),
    __metadata("design:type", Array)
], CreateBulkVocabularyInput.prototype, "vocabularyItems", void 0);
exports.CreateBulkVocabularyInput = CreateBulkVocabularyInput = __decorate([
    (0, graphql_1.InputType)()
], CreateBulkVocabularyInput);
