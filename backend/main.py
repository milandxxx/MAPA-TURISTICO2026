from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from db import get_connection
from models import Lugar

app = FastAPI()

# CORS (CLAVE PARA VUE)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# GET TODOS
# =========================
@app.get("/lugares")
def get_lugares():
    conn = get_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Error conexión DB")

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM lugares")
    data = cursor.fetchall()

    conn.close()
    return data


# =========================
# GET POR NOMBRE (BUSQUEDA)
# =========================
@app.get("/lugares/buscar")
def buscar_lugares(nombre: str):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM lugares WHERE nombre LIKE %s",
        (f"%{nombre}%",)
    )

    data = cursor.fetchall()
    conn.close()
    return data


# =========================
# CREAR
# =========================
@app.post("/lugares")
def crear_lugar(lugar: Lugar):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO lugares (nombre, descripcion, lat, lon, imagen)
        VALUES (%s, %s, %s, %s, %s)
    """, (lugar.nombre, lugar.descripcion, lugar.lat, lugar.lon, lugar.imagen))

    conn.commit()
    conn.close()

    return {"msg": "Lugar creado"}


# =========================
# ACTUALIZAR
# =========================
@app.put("/lugares/{id}")
def actualizar_lugar(id: int, lugar: Lugar):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE lugares
        SET nombre=%s, descripcion=%s, lat=%s, lon=%s, imagen=%s
        WHERE id=%s
    """, (lugar.nombre, lugar.descripcion, lugar.lat, lugar.lon, lugar.imagen, id))

    conn.commit()
    conn.close()

    return {"msg": "Lugar actualizado"}


# =========================
# ELIMINAR
# =========================
@app.delete("/lugares/{id}")
def eliminar_lugar(id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM lugares WHERE id=%s", (id,))
    conn.commit()
    conn.close()

    return {"msg": "Lugar eliminado"}