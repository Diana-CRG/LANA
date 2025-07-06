from pydantic import BaseModel
from datetime import date
from typing import Optional

class PresupuestoBase(BaseModel):
    monto: float
    fecha_crea: date
    fecha_venc: date
    categoria: str  

class PresupuestoCreate(PresupuestoBase):
    pass

class PresupuestoUpdate(BaseModel):
    monto: Optional[float] = None
    fecha_crea: Optional[date] = None
    fecha_venc: Optional[date] = None
    categoria: Optional[str] = None  

class PresupuestoOut(PresupuestoBase):
    id: int

    class Config:
        from_attributes = True
