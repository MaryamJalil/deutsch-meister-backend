import { FlashcardsService } from './flashcards.service';

describe('FlashcardsService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('parses JSON array from LLM response', async () => {
    const mockResp = {
      choices: [{ message: { content: '[{"front":"Hallo","back":"Hello","example":"Hallo!"}]' } }],
    };

    const mockClient = { chat: { completions: { create: jest.fn().mockResolvedValue(mockResp) } } } as any;

    jest.spyOn(FlashcardsService.prototype as any, 'getClient').mockReturnValue(mockClient);

    const svc = new FlashcardsService();
    const cards = await svc.generateFlashcards('some text', 1, 'A1');
    expect(Array.isArray(cards)).toBe(true);
    expect(cards[0].front).toBe('Hallo');
    expect(cards[0].back).toBe('Hello');
  });
});
