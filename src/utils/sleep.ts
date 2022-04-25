const sleep: (time: number) => Promise<void> = (
  time: number
): Promise<void> => {
  return new Promise<void>((resolve): void => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export = sleep;
