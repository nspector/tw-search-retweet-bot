import * as core from '../src/core/core';

jest.setTimeout(100000);

describe('Test src/core/core.ts', (): void => {
  test('Success Patterns', async (): Promise<void> => {
    const origin_console_log = console.log;
    const origin_console_err = console.error;
    console.log = (): void => {};
    console.error = (): void => {};
    process.env.SEARCH_LIMIT = '10';
    process.env.SEARCH_QUERY = 'test';
    const result = await core().then((): string => {
      return 'OK';
    });
    expect(result).toBe('OK');
    console.log = origin_console_log;
    console.error = origin_console_err;
  });
  test('Failure Patterns', async (): Promise<void> => {
    const origin_console_log = console.log;
    const origin_console_err = console.error;
    console.log = (): void => {};
    console.error = (): void => {};
    process.env.SEARCH_LIMIT = '';
    process.env.SEARCH_QUERY = '';
    await core().catch((e: Error): void => {
      expect(typeof e).toBe('object');
    });
    console.log = origin_console_log;
    console.error = origin_console_err;
  });
});
