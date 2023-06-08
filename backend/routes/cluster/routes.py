from fastapi import APIRouter

from data.cluster import Cluster
from utils.helpers import dataframe_to_dict

router = APIRouter()
cluster = Cluster()

@router.get('/')
def get_data():
    data, columns = cluster.get_data()
    response = {
        'data': dataframe_to_dict(data),
        'columns': columns.to_list() 
    }

    return response

@router.get('/variables')
def get_variables():
    variables = cluster.get_variables()
    response = {
        'variables': variables.to_list()
    }

    return response


@router.get('/analysis')
def get_analysis(variable: str):
    """
    Analiza y agrupa una variable del archivo.
    """
    data_sizes, description = cluster.get_variable_analysis(variable)
    response = {
        'data_sizes': data_sizes,
        'description': description
    }

    return response


@router.get('/correlation')
def get_correlation():
    """
    Identifica las posibles variables correlacionadas.
    """
    correlation, triangle = cluster.get_correlated_variables()
    response = {
        'correlation': dataframe_to_dict(correlation),
        'triangle': triangle.tolist()
    }

    return response


@router.get("/standarize")
def standarize():
    """
    Regresa los datos estandarizados.
    """
    data = cluster.standarize()
    response = dataframe_to_dict(data)

    return response