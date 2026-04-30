from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from schemas.lugar_schema import LugarCreate, LugarResponse
from services import lugar_service

router = APIRouter(prefix="/lugares", tags=["Lugares"])

@router.get("/", response_model=list[LugarResponse])
def listar_lugares(db: Session = Depends(get_db)):
    return lugar_service.get_lugares(db)

@router.get("/{lugar_id}", response_model=LugarResponse)
def obtener_lugar(lugar_id: int, db: Session = Depends(get_db)):
    lugar = lugar_service.get_lugar(db, lugar_id)
    if not lugar:
        raise HTTPException(status_code=404, detail="Lugar no encontrado")
    return lugar

@router.post("/", response_model=LugarResponse)
def crear_lugar(lugar: LugarCreate, db: Session = Depends(get_db)):
    return lugar_service.create_lugar(db, lugar)

@router.delete("/{lugar_id}")
def eliminar_lugar(lugar_id: int, db: Session = Depends(get_db)):
    lugar = lugar_service.delete_lugar(db, lugar_id)
    if not lugar:
        raise HTTPException(status_code=404, detail="Lugar no encontrado")
    return {"message": "Lugar eliminado"}
