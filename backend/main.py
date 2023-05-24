from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.pca.routes import router as pca_router
from routes.eda.routes import router as eda_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins='http://localhost:3000/',
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pca_router, prefix="/pca", tags=["PCA"])
app.include_router(eda_router, prefix="/eda", tags=["EDA"])


@app.get("/")
def read_root():
    return {"Hello": "World"}
