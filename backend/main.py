from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.eda.routes import router as eda_router
from routes.trees.routes import router as trees_router
from routes.pca.routes import router as pca_router
from routes.forest.routes import router as forest_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins='http://localhost:3000/',
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(eda_router, prefix="/eda", tags=["EDA"])
app.include_router(pca_router, prefix="/pca", tags=["PCA"])
app.include_router(trees_router, prefix="/trees", tags=["Trees"])
app.include_router(forest_router, prefix="/forest", tags=["Forest"])



@app.get("/")
def read_root():
    return {"Hello": "World"}
