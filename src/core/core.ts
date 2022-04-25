import * as data from '#utils/data';
import * as sleep from '#utils/sleep';
import * as retweet from '#utils/retweet';

const core: () => Promise<void> = async (): Promise<void> => {
  console.log('Running...');
  await data()
    .then(async (ids: string[]): Promise<void> => {
      console.log(`New Tweets: ${ids.length}`);
      const error: string[] = [];
      for (const i of ids) {
        await retweet(i)
          .then((): void => {
            console.log(`Successfully Retweeted: ${i}`);
          })
          .catch((err: Error): void => {
            error.push(err[0].message);
            console.error(`Failed to Retweet: ${i}`);
          });
        await sleep(2000);
      }
      if (!error.length) {
        console.log('Done!');
      } else {
        const logs: {} = error.reduce((prev: {}, current: string): {} => {
          prev[current] = (prev[current] || 0) + 1;
          return prev;
        }, {});
        console.error(JSON.stringify(logs, null, ' '));
      }
    })
    .catch((err: Error): never => {
      throw new Error(err as unknown as string);
    });
};

export = core;
