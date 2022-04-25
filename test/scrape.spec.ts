import * as scrape from '../src/utils/tools/scrape';

jest.setTimeout(100000);

describe('Test src/utils/tools/scrape.ts', (): void => {
  test('If you have a single search terms', async (): Promise<void> => {
    process.env.SEARCH_LIMIT = '10';
    process.env.SEARCH_QUERY = 'test';
    await scrape().then((i: string[]): void => {
      expect(Array.isArray(i)).toBe(true);
      expect(i.length).toBe(10);
      i.map((x: string): void => {
        expect(typeof x).toBe('string');
      });
    });
  });
  test('If you have two search terms', async (): Promise<void> => {
    process.env.SEARCH_LIMIT = '10';
    process.env.SEARCH_QUERY = 'test\nOK';
    await scrape().then((i: string[]): void => {
      expect(Array.isArray(i)).toBe(true);
      expect(i.length).toBe(20);
      i.map((x: string): void => {
        expect(typeof x).toBe('string');
      });
    });
  });
  test('If SEARCH_QUERY is not set', async (): Promise<void> => {
    process.env.SEARCH_QUERY = '';
    process.env.SEARCH_LIMIT = '10';
    await scrape().catch((e: Error): void => {
      expect(typeof e).toBe('object');
    });
  });
  test('If SEARCH_LIMIT is not set', async (): Promise<void> => {
    process.env.SEARCH_QUERY = 'test';
    process.env.SEARCH_LIMIT = '';
    await scrape().catch((e: Error): void => {
      expect(typeof e).toBe('object');
    });
  });
  test('If SEARCH_QUERY and SEARCH_LIMIT is not set', async (): Promise<void> => {
    process.env.SEARCH_QUERY = '';
    process.env.SEARCH_LIMIT = '';
    await scrape().catch((e: Error): void => {
      expect(typeof e).toBe('object');
    });
  });
});
