from models import LugarModel
from fastapi import FastAPI
app = FastAPI( )
@app.get("/lugares")
def get_lugares():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM lugares")
    rows = cursor.fetchall()

    lugares = [LugarModel.from_db(r).to_dict() for r in rows]

    conn.close()
    return lugares
# ============================
# POST - CREAR
# ============================
@app.post("/lugares")
def create_lugar(lugar: Lugar):
    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    INSERT INTO lugares (id, nombre, descripcion, precio, rating, imagen)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    values = (
        lugar.id,
        lugar.nombre,
        lugar.descripcion,
        lugar.precio,
        lugar.rating,
        lugar.imagen
    )

    cursor.execute(sql, values)
    conn.commit()
    conn.close()

    return {"msg": "creado"}

# ============================
# PUT - EDITAR
# ============================
@app.put("/lugares/{id}")
def update_lugar(id: int, lugar: Lugar):
    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    UPDATE lugares
    SET nombre=%s, descripcion=%s, precio=%s, rating=%s, imagen=%s
    WHERE id=%s
    """
    values = (
        lugar.nombre,
        lugar.descripcion,
        lugar.precio,
        lugar.rating,
        lugar.imagen,
        id
    )

    cursor.execute(sql, values)
    conn.commit()
    conn.close()

    return {"msg": "actualizado"}

# ============================
# DELETE - ELIMINAR
# ============================
@app.delete("/lugares/{id}")
def delete_lugar(id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM lugares WHERE id=%s", (id,))
    conn.commit()
    conn.close()

    return {"msg": "eliminado"}

# ============================
# FAVORITO (OPCIONAL)
# ============================
@app.put("/favorito/{id}")
def favorito(id: int):
    return {"msg": "ok"}