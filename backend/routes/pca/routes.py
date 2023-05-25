from fastapi import APIRouter, HTTPException

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
    data = pca.get_variables()
    response = {
        'variables': data.to_list()
    }

    return response