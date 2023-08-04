from pydantic import BaseModel


class Energy(BaseModel):
    postcode: int
    energy_type: str
    year: int
    avg_emissions: float

class EmissionOut(BaseModel):
    postcode: int
    year: int
    electricity_emissions_kg_year: float
    gas_emissions_kg_year: float

class Location(BaseModel):
    postcode: int
    suburb: str
    latitude: float
    longitude: float