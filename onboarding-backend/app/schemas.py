from pydantic import BaseModel


class Energy(BaseModel):
    postcode: int
    energy_type: str
    year: int
    avg_emissions: float

class Location(BaseModel):
    postcode: int
    suburb: str
    latitude: float
    longitude: float