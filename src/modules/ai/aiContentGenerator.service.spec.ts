import { AIContentGeneratorService } from './aiContentGenerator.service';

describe('AIContentGeneratorService (parsing)', () => {
  afterEach(() => jest.restoreAllMocks());

  it('parses vocabulary JSON from LLM', async () => {
    const mockResp = { choices: [{ message: { content: '[{"word":"Haus","meaning":"house","example":"Das Haus ist groß."}]' } }] };
    const mockClient = { chat: { completions: { create: jest.fn().mockResolvedValue(mockResp) } } } as any;

    jest.spyOn(AIContentGeneratorService.prototype as any, 'getClient').mockReturnValue(mockClient);

    const svc = new AIContentGeneratorService();
    const out = await svc.generateVocabulary({ topic: 'home', level: 'A1', count: 1 });
    expect(Array.isArray(out)).toBe(true);
    expect(out[0].word).toBe('Haus');
  });

  it('parses quiz JSON from LLM', async () => {
    const quizJson = '[{"question":"Q","options":["a","b","c","d"],"answer":"a","explanation":"x"}]';
    const mockResp = { choices: [{ message: { content: quizJson } }] };
    const mockClient = { chat: { completions: { create: jest.fn().mockResolvedValue(mockResp) } } } as any;

    jest.spyOn(AIContentGeneratorService.prototype as any, 'getClient').mockReturnValue(mockClient);

    const svc = new AIContentGeneratorService();
    const out = await svc.generateQuiz({ text: 'sample', count: 1, level: 'A1' });
    expect(Array.isArray(out)).toBe(true);
    expect(out[0].question).toBe('Q');
  });
});
