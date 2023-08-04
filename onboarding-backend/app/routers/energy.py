from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, label

from ..database import get_db

from .. import models, schemas

router = APIRouter(
    prefix="/api/energy",
    tags=["energy"],
)

@router.get("/{postcode}", response_model=schemas.EmissionOut)
def get_energy(postcode: int, year: int, db: Session = Depends(get_db)):
    """This function returns the energy data for a given postcode, year and energy type.
    """
    # Query the database for the energy data for the given postcode, year and energy type
    gas_data = (
        db.query(models.Energy)
        .filter(models.Energy.postcode == postcode)
        .filter(models.Energy.year == year)
        .filter(models.Energy.energy_type == 'Gas')
        ).first()

    electricity_data = (
        db.query(models.Energy)
        .filter(models.Energy.postcode == postcode)
        .filter(models.Energy.year == year)
        .filter(models.Energy.energy_type == 'Electricity')
        ).first()

    if gas_data == None or electricity_data == None:
        raise HTTPException(status_code=404, detail="Record not found")

    data = schemas.EmissionOut(
        postcode=postcode,
        year=year,
        electricity_emissions=electricity_data.__dict__['total_emissions'],
        gas_emissions=gas_data.__dict__['total_emissions']
    )

    return data