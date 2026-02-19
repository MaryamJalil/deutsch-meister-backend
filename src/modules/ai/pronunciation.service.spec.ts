import { PronunciationService } from './pronunciation.service';

describe('PronunciationService', () => {
  afterEach(() => jest.restoreAllMocks());

  it('parses phonetic JSON response', async () => {
    const mockResp = { choices: [{ message: { content: '{"ipa":"[ˈhalo]","simplified":"HA-lo"}' } }] };
    const mockClient = { chat: { completions: { create: jest.fn().mockResolvedValue(mockResp) } } } as any;

    jest.spyOn(PronunciationService.prototype as any, 'getClient').mockReturnValue(mockClient);

    const svc = new PronunciationService();
    const res = await svc.phonetic('Hallo');
    expect(res.ipa).toBe('[ˈhalo]');
    expect(res.simplified).toBe('HA-lo');
  });
});
