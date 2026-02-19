"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpacedRepetitionService = void 0;
const common_1 = require("@nestjs/common");
let SpacedRepetitionService = class SpacedRepetitionService {
    // Simple SM-2 implementation for next interval calculation
    computeNext(previousIntervalDays, easeFactor, quality) {
        // quality: 0-5 (5 perfect)
        if (quality < 3) {
            return { nextIntervalDays: 1, easeFactor: Math.max(1.3, easeFactor - 0.2) };
        }
        let newEF = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        if (newEF < 1.3)
            newEF = 1.3;
        let next = 0;
        if (previousIntervalDays <= 1)
            next = 6;
        else
            next = Math.round(previousIntervalDays * newEF);
        return { nextIntervalDays: next, easeFactor: newEF };
    }
    // Given history of reviews (dates and qualities), compute next due date
    computeNextFromHistory(history) {
        if (!history || history.length === 0)
            return { nextIntervalDays: 1, easeFactor: 2.5 };
        const last = history[history.length - 1];
        return this.computeNext(last.intervalDays, last.ease, last.quality);
    }
};
exports.SpacedRepetitionService = SpacedRepetitionService;
exports.SpacedRepetitionService = SpacedRepetitionService = __decorate([
    (0, common_1.Injectable)()
], SpacedRepetitionService);
