from pydantic import BaseModel

class Lugar(BaseModel):
    nombre: str
    descripcion: str
    lat: float
    lon: float
    imagen: str