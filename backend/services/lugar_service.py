from sqlalchemy.orm import Session
from models.lugar_model import Lugar
from schemas.lugar_schema import LugarCreate

def get_lugares(db: Session):
    return db.query(Lugar).all()

def get_lugar(db: Session, lugar_id: int):
    return db.query(Lugar).filter(Lugar.id == lugar_id).first()

def create_lugar(db: Session, lugar: LugarCreate):
    db_lugar = Lugar(**lugar.model_dump())
    db.add(db_lugar)
    db.commit()
    db.refresh(db_lugar)
    return db_lugar

def delete_lugar(db: Session, lugar_id: int):
    lugar = get_lugar(db, lugar_id)
    if lugar:
        db.delete(lugar)
        db.commit()
    return lugar
