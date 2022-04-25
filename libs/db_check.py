import os
import mysql.connector as mydb

conn = mydb.connect(
    host='mysql_container' if os.getenv(
        'DB_HOST') == None else os.getenv('DB_HOST'),
    port='3306' if os.getenv(
        'DB_HOST') == None else '33066',
    user='docker',
    password='docker',
    database='my_db'
)

conn.is_connected()
