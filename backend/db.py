import mysql.connector
from mysql.connector import Error

def get_connection():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="mia2026bd@",
            database="mapa_turistico2026"
        )
        return conn
    except Error as e:
        print("Error DB:", e)
        return None