from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, label

from ..database import get_db

from .. import models, schemas

router = APIRouter(
    prefix="/energy",
    tags=["energy"],
)

@router.get("/", response_model=schemas.Energy)
def get_energy(db: Session = Depends(get_db), postcode: int = None, year: int = None, energy_type: str = None):
    energy_type = energy_type.lower()
    query = (
        db.query(models.Energy)
        .filter(models.Energy.postcode == postcode)
        .filter(models.Energy.year == year)
        .filter(func.lower(models.Energy.energy_type) == energy_type)
        )

    return query.first()