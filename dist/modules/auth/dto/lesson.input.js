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
exports.CreateExampleInput = exports.CreateVocabularyInput = exports.CreateLessonInput = void 0;
const index_js_1 = require("@nestjs/graphql/dist/index.js");
const class_validator_1 = require("class-validator");
let CreateLessonInput = class CreateLessonInput {
};
exports.CreateLessonInput = CreateLessonInput;
__decorate([
    (0, index_js_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLessonInput.prototype, "title", void 0);
__decorate([
    (0, index_js_1.Field)({ nullable: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLessonInput.prototype, "description", void 0);
__decorate([
    (0, index_js_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateLessonInput.prototype, "content", void 0);
__decorate([
    (0, index_js_1.Field)(() => index_js_1.Int),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateLessonInput.prototype, "order", void 0);
__decorate([
    (0, index_js_1.Field)(() => index_js_1.Int),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateLessonInput.prototype, "levelId", void 0);
exports.CreateLessonInput = CreateLessonInput = __decorate([
    (0, index_js_1.InputType)()
], CreateLessonInput);
let CreateVocabularyInput = class CreateVocabularyInput {
};
exports.CreateVocabularyInput = CreateVocabularyInput;
__decorate([
    (0, index_js_1.Field)(),
    __metadata("design:type", String)
], CreateVocabularyInput.prototype, "word", void 0);
__decorate([
    (0, index_js_1.Field)(),
    __metadata("design:type", String)
], CreateVocabularyInput.prototype, "meaning", void 0);
exports.CreateVocabularyInput = CreateVocabularyInput = __decorate([
    (0, index_js_1.InputType)()
], CreateVocabularyInput);
let CreateExampleInput = class CreateExampleInput {
};
exports.CreateExampleInput = CreateExampleInput;
__decorate([
    (0, index_js_1.Field)(),
    __metadata("design:type", String)
], CreateExampleInput.prototype, "sentence", void 0);
__decorate([
    (0, index_js_1.Field)(),
    __metadata("design:type", String)
], CreateExampleInput.prototype, "translation", void 0);
exports.CreateExampleInput = CreateExampleInput = __decorate([
    (0, index_js_1.InputType)()
], CreateExampleInput);
