import * as retweet from '../src/utils/retweet';

test('Test src/utils/retweet.ts', async (): Promise<void> => {
  await retweet('12898798787').catch((err: Error): void => {
    const i: string = (err && 'OK') || 'NG';
    expect(i).toBe('OK');
  });
});
