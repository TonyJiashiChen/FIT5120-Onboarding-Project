from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import cast, String

from ..database import get_db

from .. import models, schemas

router = APIRouter(
    prefix="/api/location",
    tags=["location"],
)

@router.get("/", response_model=list[schemas.Location])
def get_location(db: Session = Depends(get_db), postcode: int = None, suburb: str = ''):
    suburb = suburb.lower()
    # Query database for location data if postcode is not provided
    if postcode is None:
        return db.query(models.Location).filter(models.Location.suburb.ilike(f"%{suburb}%")).all()
        
    # Query database for location data based on postcode and suburb
    data = (
        db.query(models.Location)
        .filter(cast(models.Location.postcode, String).contains(str(postcode)))
        .filter(models.Location.suburb.ilike(f"%{suburb}%"))
        ).all()

    if data == None:
        raise HTTPException(status_code=404, detail="Location not found")

    return data