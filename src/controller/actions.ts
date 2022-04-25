import * as core from '#core/core';

const actions: () => Promise<void> = async (): Promise<void> => {
  console.log('Start Github Actions version...');
  await core();
};

export = actions;
