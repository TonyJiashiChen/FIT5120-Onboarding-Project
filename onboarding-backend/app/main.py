from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import energy, location
app = FastAPI(
    docs_url="/api/docs"
)

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(energy.router)
app.include_router(location.router)

@app.get('/api')
def root():
    return {"message": "Hello"}