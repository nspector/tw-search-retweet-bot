import * as sleep from '../src/utils/sleep';

test('Test src/utils/sleep.ts', async (): Promise<void> => {
  await sleep(1000).then((i: void): void => {
    expect(typeof i).toBe('undefined');
  });
});
