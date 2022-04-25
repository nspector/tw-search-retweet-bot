require('dotenv').config();
import * as actions from '#controller/actions';
import * as schedule from '#controller/schedule';

const cron_time: string = process.env.NODE_CRON;
const gh_actions: string = process.env.GITHUB_ACTIONS;

(async (): Promise<void> => {
  if (gh_actions === 'true') {
    await actions();
  } else {
    schedule(cron_time);
  }
})();
