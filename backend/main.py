from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import lugar_routes

app = FastAPI(title="API Lugares Turísticos")

# 🔥 CORS (CLAVE)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en producción se restringe
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(lugar_routes.router)

@app.get("/")
def root():
    return {"message": "API funcionando correctamente"}