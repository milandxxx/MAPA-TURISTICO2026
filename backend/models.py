from sqlalchemy import Column,Integer,String,Float,Boolean
from db import Base

class Lugar(Base):
    __tablename__='lugares'
    id=Column(Integer,primary_key=True,index=True)
    nombre=Column(String(255))
    lat=Column(Float)
    lon=Column(Float)
    descripcion=Column(String(500))
    imagen=Column(String(500))
    categoria=Column(String(100))
    precio=Column(Float)
    rating=Column(Float)
    favorito=Column(Boolean,default=False)
