from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
import os

from data.pca import PCA
from utils.helpers import dataframe_to_dict

router = APIRouter()

pca = None
folder_path = 'files'
fileName = None

@router.post("/upload_file")
async def upload_file(file: UploadFile = File(...)):
    """
    Recibe el archivo del usuario que contiene el dataset
    """
    global fileName
    try:
        file_path = os.path.join(folder_path, file.filename)
        with open(file_path, "wb") as myFile:
            content = await file.read()
            myFile.write(content)
            fileName = myFile.name
        return JSONResponse(content={
            "saved": True,
            "fileName": fileName
        }, status_code=200)
    except FileNotFoundError:
        return JSONResponse(content = {
            "saved": False
        }, status_code=404)
        


@router.get("/")
def read_data():
    """
    Regresa los datos leídos del archivo csv.
    """
    global fileName
    pca = PCA(fileName)

    data = pca.get_data()
    response = dataframe_to_dict(data)

    return response

@router.get("/correlation")
def get_correlation():
    """
    Regresa la matriz de correlación de los datos.
    """
    global fileName
    pca = PCA(fileName)

    correlation, matrix = pca.get_correlation()
    response = {
        'correlation': dataframe_to_dict(correlation),
        'matrix': matrix.tolist()
    }

    return response

@router.get("/standarize")
def standarize():
    """
    Regresa los datos estandarizados.
    """
    global fileName
    pca = PCA(fileName)

    data = pca.standarize()
    response = dataframe_to_dict(data)

    return response


@router.get("/variance")
def get_variance(n_components: int):
    """
    Regresa la matriz de covarianzas o correlaciones, y se calculan los componentes (eigen-vectores) y la varianza (eigen-valores)
    """
    global fileName
    pca = PCA(fileName)

    if n_components < 3:
        raise HTTPException(status_code=400, detail="El numero de componentes debe ser mayor a 2.")
    components = pca.get_pca(n_components)
    variance, component, sum_variance = pca.get_variance()
    cum_variance = pca.get_cumulative_variance()
    response = {
        'pca_components': components.tolist(),
        'variance': variance.tolist(),
        'cum_variance': cum_variance.tolist(),
        'component': component,
        'sum_variance': sum_variance
    }

    return response

@router.get("/relevance")
def get_relevance(charge: float):
    """
    Se examina la proporción de relevancias -cargas-
    """
    global fileName
    pca = PCA(fileName)

    charges, acp_data = pca.get_relevance_proportion(charge)
    response = {
        'charges': dataframe_to_dict(charges),
        'acp_data': dataframe_to_dict(acp_data)
    }

    return response

@router.get("/variables")
def get_available_variables():
    """
    Regresa las variables disponibles.
    """
    global fileName
    pca = PCA(fileName)

    data = pca.get_variables()
    response = {
        'variables': data.to_list()
    }

    return response