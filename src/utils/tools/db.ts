import mysql = require('mysql2/promise');

const db_setting: mysql.ConnectionOptions = {
  host: process.env.DB_HOST ? process.env.DB_HOST : 'mysql_container',
  port: process.env.DB_HOST ? 33066 : 3306,
  user: 'docker',
  password: 'docker',
  database: 'my_db',
};

const db: () => Promise<{
  read: () => Promise<string[] | Error>;
  write: (data: string[]) => Promise<string[] | Error>;
}> = async () => {
  const database: mysql.Connection = await mysql.createConnection(db_setting);
  return {
    read: async (): Promise<string[] | Error> => {
      try {
        const sql_query =
          'CREATE TABLE IF NOT EXISTS tweets(id int AUTO_INCREMENT, tweet_id VARCHAR(50), PRIMARY KEY(id))';
        await database.query(sql_query);
        const data: [
          {
            tweet_id: string;
          }
        ] = (await database.query('SELECT tweet_id FROM tweets').then((i) => {
          return i[0];
        })) as [{ tweet_id: string }];
        const data_ids: string[] = data.map(
          (i: { tweet_id: string }): string => {
            return i.tweet_id;
          }
        );
        return data_ids;
      } catch (e: unknown) {
        return e as Error;
      } finally {
        database.end();
      }
    },
    write: async (data: string[]): Promise<string[] | Error> => {
      try {
        data.map(async (i: string): Promise<void> => {
          const sql_query = 'INSERT INTO tweets SET ?';
          await database.query(sql_query, { tweet_id: i });
        });
      } catch (e: unknown) {
        return e as Error;
      } finally {
        database.end();
      }
    },
  };
};

export = db;
