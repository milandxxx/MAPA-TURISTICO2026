from pydantic import BaseModel
from typing import Optional

class LugarBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    latitud: float
    longitud: float
    imagen: Optional[str] = None

class LugarCreate(LugarBase):
    pass

class LugarResponse(LugarBase):
    id: int

    class Config:
        from_attributes = True
