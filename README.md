## tw-search-retweet-bot (fork of: https://github.com/redpeacock78/tw-search-retweet-bot)

This is a fork of the above with some minimal changes, but most of the same stuff. It operates exactly the same. If you want to set up a bot yourself, you can either fork this OR, you can set up a build to use the images published from here and use the `run` workflow to run it. I currently use `cron-job.org` to run a cron using the tw-webhook. However you could definitely use something else (as outlined below).

## How It works
This uses `twint` to scrape twitter for latest X tweets on each run for your search. It then checks aginst it's mysql databse to see if any are new (this works on github actions as it caches the mysql db between runs). If any are new, it will use the twitter api to retweet the new tweets.
## 🛠 Usage
### 🀄️ Way 1: Runs on Github Actions (This is the easiest)
1. Fork this repository.
![Fork](https://i.imgur.com/4bcu1ws.jpg)
2. Add the following `Secret Environment Values` to `Settings`->`Secrets` in the forked repository.
![Secret_1](https://imgur.com/z1g8Qz4.jpg)
![Secret_2](https://imgur.com/EDHEHwI.jpg)
    <details><summary><b>Secret Environment Values List</b></summary><div>

    |Variable name|Meaning|Default|Required|Notes|
    |:-:|:-:|:-:|:-:|:-:|
    |`CONSUMER_KEY`|Twitter API consumer key|-|Yes||
    |`CONSUMER_SECRET`|Twitter API consumer secret|-|Yes||
    |`ACCESS_TOKEN_KEY`|Twitter API access token key|-|Yes|Use the token obtained after granting `Read and Write` permissions.|
    |`ACCESS_TOKEN_SECRET`|Twitter API access token secret|-|Yes|Same as above.|
    |`SEARCH_QUERY`|What you want to search for on Twitter|-|Yes|Words you want to search for on Twitter (You can use the [`search command`](https://developer.twitter.com/en/docs/twitter-api/v1/rules-and-filtering/search-operators)).|
    |`SEARCH_LIMIT`|Maximum number of cases to be retrieved|100|No|By default, it is set to retrieve 100 items (Due to API limitations, it is not recommended to set a number higher than 100).|
    </div></details>

3. Agree to enable Actions.
![Enable_Actions](https://imgur.com/AnQxsp2.jpg)
4. After agreeing to activate the action, re-enable the scheduled workflow (the scheduled task of the workflow).
  ⚠️ Activate the **"tw-search-retweet-bot"** and **"Revive"** items.
![Enable_workflow](https://imgur.com/GHdlfpA.jpg)
    - ***According to [the official documentation](https://docs.github.com/en/actions/managing-workflow-runs/disabling-and-enabling-a-workflow), when a public repository is forked, scheduled workflows are disabled by default. Therefore, in order to enable Github Actions timed tasks for forked repositories, this step is required.***
5. Once you have completed the above steps, Github Actions will host the workflow to run every 10 minutes by default.
- <details><summary><b>Advanced</b></summary>

  > Github Actions scheduled does not guarantee the time interval at which the operation starts, but rather the time interval at which the queue to start the operation is reserved, so the execution time may vary depending on various factors. Therefore, if you want to run at a more accurate time interval, here is how to deal with it.
  > ```bash
  > # API
  > ## ${owner}: Username
  > ## ${repo}: Repository name
  > https://api.github.com/repos/${owner}/${repo}/dispatches
  >
  > # Headers
  > ## Key: Value
  > ## ${github_token}: The token you obtained
  > Accept: application/vnd.github.everest-preview+json
  > Authorization: token ${github_token}
  >
  > # Request method
  > POST
  > # Request body
  > { "event_type": "tw-webhook" }
  > ```
  > By accessing the API shown above at regular intervals in the way you prefer, you can make them work at precise intervals.
  > We recommend using the following services for this purpose.
  > - [IFTTT](https://ifttt.com/)
  > - [Zapier](https://zapier.com/)
  > - [Power Automate](https://flow.microsoft.com/ja-jp/)
  > - [cron-job.org](https://cron-job.org/en/)
  > - [Zoho Flow](https://www.zoho.com/flow/)
  </details>

### 🎴 Way 2: Runs on a self-hosted server
- #### 📦 Dependencies
  ***Caution: To run the program, you will need the following items, so please install them beforehand***
  - [Docker](https://docs.docker.jp/)
  - [Docker Compose](https://docs.docker.jp/compose/overview.html)
  - [GNU Make](https://www.gnu.org/software/make/)

- #### ⚙ Setup
  You can either `git clone` this repository or [download](https://github.com/redpeacock78/tw-search-retweet-bot/releases/latest) and unzip it.
  Create an `.env` file in the root directory and write the various settings as follows.
  ```bash
  # Twitter API Key
  CONSUMER_KEY='xxxxxxxxxxxxxxxxxxxxx'
  CONSUMER_SECRET='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  ACCESS_TOKEN_KEY='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  ACCESS_TOKEN_SECRET='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

  # Twitter Search Setting
  # If there is more than one thing you want to search for, use
  # SEARCH_QUERY='Search_1
  # Search_2'
  # or use a line feed code (\n) to separate them.
  SEARCH_QUERY='What you want to search for on Twitter'
  SEARCH_LIMIT='Maximum number of cases to be retrieved'

  # How often do you perform searches
  # The following settings will work at 5-minute intervals
  # For more information, see https://github.com/merencia/node-cron
  NODE_CRON='*/5 * * * *'
  ```

- #### 🖥  Operation
  ```bash
  # At initial startup
  $ make build-up
  # By default, Debian is used; if you want to use Alpine, use
  $ make build-up dist=alpine

  # Shutdown
  $ make down

  # Startup after the second time
  $ make up
  ```

## 🥝 License
This source code is licensed [MIT](https://github.com/nspector/tw-search-retweet-bot/blob/master/LICENCE).