from sqlalchemy.orm import Session
from models.presupuestos import Presupuesto
from schemas.presupuestos import PresupuestoCreate, PresupuestoUpdate

def crear_presupuesto(db: Session, data: PresupuestoCreate):
    nuevo = Presupuesto(**data.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

def obtener_presupuestos(db: Session):
    return db.query(Presupuesto).all()

def obtener_presupuesto(db: Session, presupuesto_id: int):
    return db.query(Presupuesto).filter_by(id=presupuesto_id).first()

def actualizar_presupuesto(db: Session, presupuesto_id: int, data: PresupuestoUpdate):
    presupuesto = obtener_presupuesto(db, presupuesto_id)
    if not presupuesto:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        setattr(presupuesto, key, value)
    db.commit()
    db.refresh(presupuesto)
    return presupuesto

def eliminar_presupuesto(db: Session, presupuesto_id: int):
    presupuesto = obtener_presupuesto(db, presupuesto_id)
    if not presupuesto:
        return None
    db.delete(presupuesto)
    db.commit()
    return True

def obtener_presupuesto(db: Session, presupuesto_id: int):
    return db.query(Presupuesto).filter_by(id=presupuesto_id).first()
