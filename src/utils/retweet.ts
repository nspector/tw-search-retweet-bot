require('dotenv').config();
import twitter = require('twitter');

const retweet: (id: string) => Promise<void> = async (
  id: string
): Promise<void> => {
  const client: twitter = new twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  });
  const condition = 'statuses/retweet';
  await client.post(condition, {
    id: id,
  });
};

export = retweet;
