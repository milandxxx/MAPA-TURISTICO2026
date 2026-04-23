from pydantic import BaseModel

class Lugar(BaseModel):
    id: int
    nombre: str
    descripcion: str
    latitud: float
    longitud: float