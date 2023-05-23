from fastapi import APIRouter
import json

from data.pca import PCA
from utils.helpers import dataframe_to_dict

router = APIRouter()
pca = PCA()


@router.get("/")
def read_data():
    """
    Regresa los datos leídos del archivo csv.
    """
    data = pca.get_data()
    response = dataframe_to_dict(data)

    return response

@router.get("/correlation")
def get_correlation():
    """
    Regresa la matriz de correlación de los datos.
    """
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
    data = pca.standarize()
    response = dataframe_to_dict(data)

    return response


@router.get("/variance")
def get_variance(n_components: int):
    """
    Regresa la matriz de covarianzas o correlaciones, y se calculan los componentes (eigen-vectores) y la varianza (eigen-valores)
    """
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