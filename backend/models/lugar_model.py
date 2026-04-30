from sqlalchemy import Column, Integer, String, Float
from db.database import Base

class Lugar(Base):
    __tablename__ = "lugares"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(String)
    latitud = Column(Float)
    longitud = Column(Float)
    imagen = Column(String)
