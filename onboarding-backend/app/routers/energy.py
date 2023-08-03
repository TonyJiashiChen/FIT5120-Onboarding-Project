from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, label

from ..database import get_db

from .. import models, schemas

router = APIRouter(
    prefix="/api/energy",
    tags=["energy"],
)

@router.get("/{postcode}", response_model=schemas.Energy)
def get_energy(postcode: int, year: int, energy_type: str, db: Session = Depends(get_db)):
    """This function returns the energy data for a given postcode, year and energy type.
    """
    
    energy_type = energy_type.lower()

    data = (
        db.query(models.Energy)
        .filter(models.Energy.postcode == postcode)
        .filter(models.Energy.year == year)
        .filter(func.lower(models.Energy.energy_type) == energy_type)
        ).first()

    if data == None:
        raise HTTPException(status_code=404, detail="Record not found")

    return data