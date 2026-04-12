from typing import Optional

class LugarModel:
    def __init__(self, id: int, nombre: str, descripcion: str, precio: float, rating: float, imagen: str):
        self.id = id
        self.nombre = nombre
        self.descripcion = descripcion
        self.precio = precio
        self.rating = rating
        self.imagen = imagen

    @staticmethod
    def from_db(row: dict):
        return LugarModel(
            id=row["id"],
            nombre=row["nombre"],
            descripcion=row["descripcion"],
            precio=row["precio"],
            rating=row["rating"],
            imagen=row["imagen"]
        )

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "precio": self.precio,
            "rating": self.rating,
            "imagen": self.imagen
        }