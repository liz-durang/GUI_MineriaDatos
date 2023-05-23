from fastapi import FastAPI

from routes.pca.routes import router as pca_router

app = FastAPI()

app.include_router(pca_router, prefix="/pca", tags=["PCA"])


@app.get("/")
def read_root():
    return {"Hello": "World"}
