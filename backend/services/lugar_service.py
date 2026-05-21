from models.lugar_model import Lugar

# LISTAR
def get_lugares(db):
    return db.query(Lugar).all()

# BUSCAR
def buscar_lugar(nombre, db):
    return db.query(Lugar).filter(
        Lugar.nombre.ilike(f"%{nombre}%")
    ).all()

# CREAR
def crear_lugar(lugar, db):
    nuevo = Lugar(
        nombre=lugar.nombre,
        descripcion=lugar.descripcion,
        imagen=lugar.imagen,
        latitud=lugar.latitud,
        longitud=lugar.longitud,
        abierto=lugar.abierto
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    return nuevo

# EDITAR
def editar_lugar(id, lugar, db):
    lugar_db = db.query(Lugar).filter(Lugar.id == id).first()

    if not lugar_db:
        return None

    lugar_db.nombre = lugar.nombre
    lugar_db.descripcion = lugar.descripcion
    lugar_db.imagen = lugar.imagen
    lugar_db.latitud = lugar.latitud
    lugar_db.longitud = lugar.longitud
    lugar_db.abierto = lugar.abierto

    db.commit()
    db.refresh(lugar_db)

    return lugar_db

# ELIMINAR
def eliminar_lugar(id, db):
    lugar_db = db.query(Lugar).filter(Lugar.id == id).first()

    if not lugar_db:
        return None

    db.delete(lugar_db)
    db.commit()

    return True