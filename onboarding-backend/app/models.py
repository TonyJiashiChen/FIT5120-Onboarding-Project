from .database import Base

from sqlalchemy import Column, Integer, String, Float, ForeignKey


class Location(Base):
    __tablename__ = "locations"

    postcode = Column(Integer, primary_key=True, nullable=False)
    suburb = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

class Energy(Base):
    __tablename__ = "energy"

    postcode = Column(Integer, ForeignKey("locations.postcode"), primary_key=True, nullable=False)
    year = Column(Integer, primary_key=True, nullable=False)
    energy_type = Column(String, primary_key=True, nullable=False)
    kwh_total = Column(Float, nullable=True)
    gj_total = Column(Float, nullable=True)
    total_cost = Column(Float, nullable=False)
    total_emissions = Column(Float, nullable=False)
    avg_emissions = Column(Float, nullable=False)
    num_customers = Column(Integer, nullable=False)


