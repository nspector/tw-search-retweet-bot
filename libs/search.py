import os
import twint
from dotenv import load_dotenv
from contextlib import redirect_stdout
load_dotenv()


tweets = []
result = []


def scrape():
    limit = int(os.getenv('SEARCH_LIMIT'))
    queries = os.getenv('SEARCH_QUERY').replace('\\n', '\n').split('\n')
    for query in queries:
        config = twint.Config()
        config.Limit = limit
        config.Search = query
        config.Store_object = True
        config.Store_object_tweets_list = tweets
        with redirect_stdout(open(os.devnull, 'w')):
            twint.run.Search(config)
        for tweet in tweets[:limit]:
            result.append(str(tweet.id))
    print('\n'.join(result))


scrape()
