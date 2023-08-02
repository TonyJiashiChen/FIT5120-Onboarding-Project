from fastapi import FastAPI

from .routers import energy, location

app = FastAPI()

app.include_router(energy.router)
app.include_router(location.router)

@app.get('/')
def root():
    return {"message": "Hello"}