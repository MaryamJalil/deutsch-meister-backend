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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashcardsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const flashcards_service_1 = require("./flashcards.service");
let FlashcardObject = class FlashcardObject {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], FlashcardObject.prototype, "front", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], FlashcardObject.prototype, "back", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], FlashcardObject.prototype, "example", void 0);
FlashcardObject = __decorate([
    (0, graphql_1.ObjectType)()
], FlashcardObject);
let FlashcardsResolver = class FlashcardsResolver {
    constructor(flashcards) {
        this.flashcards = flashcards;
    }
    async generateFlashcards(text, count, level) {
        return this.flashcards.generateFlashcards(text, count, level);
    }
};
exports.FlashcardsResolver = FlashcardsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => [FlashcardObject]),
    __param(0, (0, graphql_1.Args)('text')),
    __param(1, (0, graphql_1.Args)('count', { type: () => graphql_1.Int, defaultValue: 10 })),
    __param(2, (0, graphql_1.Args)('level', { defaultValue: 'A1' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], FlashcardsResolver.prototype, "generateFlashcards", null);
exports.FlashcardsResolver = FlashcardsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [flashcards_service_1.FlashcardsService])
], FlashcardsResolver);
