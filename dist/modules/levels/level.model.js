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
exports.Level = void 0;
const graphql_1 = require("@nestjs/graphql");
const module_model_js_1 = require("../modules/module.model.js");
const levelName_enum_1 = require("../../common/enums/levelName.enum");
let Level = class Level {
};
exports.Level = Level;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Level.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => levelName_enum_1.LevelCode),
    __metadata("design:type", String)
], Level.prototype, "code", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Level.prototype, "position", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Level.prototype, "courseId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [module_model_js_1.Module], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], Level.prototype, "modules", void 0);
exports.Level = Level = __decorate([
    (0, graphql_1.ObjectType)()
], Level);
