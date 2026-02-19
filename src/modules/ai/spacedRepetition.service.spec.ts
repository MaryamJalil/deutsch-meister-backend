import { SpacedRepetitionService } from './spacedRepetition.service';

describe('SpacedRepetitionService', () => {
  let svc: SpacedRepetitionService;

  beforeEach(() => {
    svc = new SpacedRepetitionService();
  });

  it('returns 1 day and reduced EF when quality < 3', () => {
    const res = svc.computeNext(10, 2.5, 2);
    expect(res.nextIntervalDays).toBe(1);
    expect(res.easeFactor).toBeLessThanOrEqual(2.5);
  });

  it('calculates next interval and EF for good quality', () => {
    const res = svc.computeNext(1, 2.5, 5);
    expect(res.nextIntervalDays).toBeGreaterThanOrEqual(6);
    expect(res.easeFactor).toBeGreaterThanOrEqual(1.3);
  });

  it('computeNextFromHistory uses last entry', () => {
    const history = [{ intervalDays: 1, ease: 2.5, quality: 5 }];
    const res = svc.computeNextFromHistory(history as any);
    expect(res.nextIntervalDays).toBeGreaterThanOrEqual(6);
  });
});
