import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="santiagobd2026@",
        database="mapa_turistico2026"
    )