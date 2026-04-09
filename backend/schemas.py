from pydantic import BaseModel

class LugarBase(BaseModel):
    nombre:str
    lat:float
    lon:float
    descripcion:str
    imagen:str
    categoria:str
    precio:float
    rating:float

class LugarCreate(LugarBase): pass

class LugarResponse(LugarBase):
    id:int
    favorito:bool
    class Config:
        from_attributes=True
