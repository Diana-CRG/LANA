from fastapi import FastAPI
from api import presupuestos  # Importación el router de presupuestos
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Lana App",
    description="API para la gestión de presupuestos personales",
    version="1.0.0"
)

app.include_router(presupuestos.router, prefix="/presupuestos")


# Si usas frontend (React Native), habilita CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # o usa ["http://localhost:3000"] si es más seguro
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


