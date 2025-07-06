from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas.presupuestos import PresupuestoCreate, PresupuestoOut, PresupuestoUpdate
from crud import presupuestos as crud_presupuestos

router = APIRouter(prefix="/presupuestos", tags=["Presupuestos"])

@router.post("/", response_model=PresupuestoOut)
def crear_presupuesto(data: PresupuestoCreate, db: Session = Depends(get_db)):
    return crud_presupuestos.crear_presupuesto(db, data)

@router.get("/", response_model=list[PresupuestoOut])
def listar_presupuestos(db: Session = Depends(get_db)):
    return crud_presupuestos.obtener_presupuestos(db)

@router.put("/{id}", response_model=PresupuestoOut)
def actualizar_presupuesto(id: int, data: PresupuestoUpdate, db: Session = Depends(get_db)):
    presupuesto = crud_presupuestos.actualizar_presupuesto(db, id, data)
    if not presupuesto:
        raise HTTPException(status_code=404, detail="Presupuesto no encontrado")
    return presupuesto

@router.delete("/{id}")
def eliminar_presupuesto(id: int, db: Session = Depends(get_db)):
    success = crud_presupuestos.eliminar_presupuesto(db, id)
    if not success:
        raise HTTPException(status_code=404, detail="Presupuesto no encontrado")
    return {"ok": True}

@router.get("/{id}", response_model=PresupuestoOut)
def obtener_presupuesto(id: int, db: Session = Depends(get_db)):
    presupuesto = crud_presupuestos.obtener_presupuesto(db, id)
    if not presupuesto:
        raise HTTPException(status_code=404, detail="Presupuesto no encontrado")
    return presupuesto
