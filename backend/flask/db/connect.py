import os
import pymysql
from dotenv import load_dotenv

load_dotenv()

def connect():
    try:
        connection = pymysql.connect(
            host=os.getenv('DB_HOST'),
            port=int(os.getenv('DB_PORT')),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME'),
            cursorclass=pymysql.cursors.DictCursor
        )
        print("polaczono z baza")
        return connection
    except pymysql.MySQLError as err:
        print(f"blad przy laczeniu do bazy: {err}")
        raise err