from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.database import get_db
from services import lugar_service
from schemas.lugar_schema import LugarCreate

router = APIRouter(
    prefix="/lugares",
    tags=["Lugares"]
)

# LISTAR
@router.get("/")
def listar_lugares(db: Session = Depends(get_db)):
    return lugar_service.get_lugares(db)

# BUSCAR
@router.get("/buscar/{nombre}")
def buscar_lugar(nombre: str, db: Session = Depends(get_db)):
    return lugar_service.buscar_lugar(nombre, db)

# CREAR
@router.post("/")
def crear_lugar(lugar: LugarCreate, db: Session = Depends(get_db)):
    return lugar_service.crear_lugar(lugar, db)

# EDITAR
@router.put("/{id}")
def editar_lugar(id: int, lugar: LugarCreate, db: Session = Depends(get_db)):
    actualizado = lugar_service.editar_lugar(id, lugar, db)

    if not actualizado:
        raise HTTPException(status_code=404, detail="Lugar no encontrado")

    return actualizado

# ELIMINAR
@router.delete("/{id}")
def eliminar_lugar(id: int, db: Session = Depends(get_db)):
    eliminado = lugar_service.eliminar_lugar(id, db)

    if not eliminado:
        raise HTTPException(status_code=404, detail="Lugar no encontrado")

    return {"mensaje": "Lugar eliminado"}