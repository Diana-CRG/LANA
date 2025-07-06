from sqlalchemy import Column, Integer, DECIMAL, Date, String
from database import Base

class Presupuesto(Base):
    __tablename__ = "presupuesto"

    id = Column("id_presupuesto", Integer, primary_key=True, index=True)
    monto = Column(DECIMAL(10, 2), nullable=False)
    fecha_crea = Column(Date, nullable=False)
    fecha_venc = Column(Date, nullable=False)
    categoria = Column(String(50), nullable=False)  # ← NUEVO campo
