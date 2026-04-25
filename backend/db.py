import mysql.connector
from mysql.connector import Error

def get_connection():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="santiagobd2026@",
            database="mapa_turistico2026"
        )
        return conn
    except Error as e:
        print("Error DB:", e)
        return None