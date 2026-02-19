import { Injectable } from '@nestjs/common';

@Injectable()
export class SpacedRepetitionService {
    // Simple SM-2 implementation for next interval calculation
    computeNext(previousIntervalDays: number, easeFactor: number, quality: number) {
        // quality: 0-5 (5 perfect)
        if (quality < 3) {
            return { nextIntervalDays: 1, easeFactor: Math.max(1.3, easeFactor - 0.2) };
        }

        let newEF = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        if (newEF < 1.3) newEF = 1.3;

        let next = 0;
        if (previousIntervalDays <= 1) next = 6;
        else next = Math.round(previousIntervalDays * newEF);

        return { nextIntervalDays: next, easeFactor: newEF };
    }

    // Given history of reviews (dates and qualities), compute next due date
    computeNextFromHistory(history: { intervalDays: number; ease: number; quality: number }[]) {
        if (!history || history.length === 0) return { nextIntervalDays: 1, easeFactor: 2.5 };

        const last = history[history.length - 1];
        return this.computeNext(last.intervalDays, last.ease, last.quality);
    }
}
