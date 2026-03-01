"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcercisesModule = void 0;
const common_1 = require("@nestjs/common");
const excercises_service_1 = require("./excercises.service");
const excercises_resolver_1 = require("../excercises.resolver");
const aiModule_1 = require("../../../modules/ai/aiModule");
let ExcercisesModule = class ExcercisesModule {
};
exports.ExcercisesModule = ExcercisesModule;
exports.ExcercisesModule = ExcercisesModule = __decorate([
    (0, common_1.Module)({
        imports: [aiModule_1.AIModule],
        providers: [excercises_service_1.ExcercisesService, excercises_resolver_1.ExercisesResolver],
        exports: [excercises_service_1.ExcercisesService],
    })
], ExcercisesModule);
