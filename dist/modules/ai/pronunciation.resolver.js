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
exports.PronunciationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const pronunciation_service_1 = require("./pronunciation.service");
let PhoneticResult = class PhoneticResult {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PhoneticResult.prototype, "ipa", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PhoneticResult.prototype, "simplified", void 0);
PhoneticResult = __decorate([
    (0, graphql_1.ObjectType)()
], PhoneticResult);
let PronunciationResolver = class PronunciationResolver {
    constructor(pronunciation) {
        this.pronunciation = pronunciation;
    }
    async phonetic(text, language) {
        return this.pronunciation.phonetic(text, language);
    }
};
exports.PronunciationResolver = PronunciationResolver;
__decorate([
    (0, graphql_1.Query)(() => PhoneticResult),
    __param(0, (0, graphql_1.Args)('text')),
    __param(1, (0, graphql_1.Args)('language', { defaultValue: 'German' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PronunciationResolver.prototype, "phonetic", null);
exports.PronunciationResolver = PronunciationResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [pronunciation_service_1.PronunciationService])
], PronunciationResolver);
