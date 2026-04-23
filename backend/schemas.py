from pydantic import BaseModel

class Lugar(BaseModel):
    id: int
    nombre: str
    descripcion: str
    precio: float
    rating: float
    imagen: str