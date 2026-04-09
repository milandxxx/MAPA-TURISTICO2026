from fastapi import FastAPI,Depends,HTTPException
from sqlalchemy.orm import Session
from db import engine,Base,get_db
import models,schemas

app=FastAPI()
Base.metadata.create_all(bind=engine)

@app.get('/lugares')
def get_all(db:Session=Depends(get_db)):
    return db.query(models.Lugar).all()

@app.post('/lugares')
def create(lugar:schemas.LugarCreate,db:Session=Depends(get_db)):
    nuevo=models.Lugar(**lugar.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@app.delete('/lugares/{id}')
def delete(id:int,db:Session=Depends(get_db)):
    l=db.query(models.Lugar).filter(models.Lugar.id==id).first()
    if not l: raise HTTPException(404)
    db.delete(l)
    db.commit()
    return {'ok':True}
