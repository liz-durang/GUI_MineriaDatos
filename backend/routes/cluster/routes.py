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
    data = cluster.get_standarize()
    response = dataframe_to_dict(data)

    return response

@router.get("/get-elbow-method")
def get_elbow_method():
    """
    Definición de k clusters para K-means
    """
    index, SSE = cluster.get_elbow_method()
    response = {
        'index': index,
        'k': SSE
    }

    return response

@router.get("/create-labels")
def create_label():
    """
    Etiquetas y elementos por cluster
    """
    data, elements = cluster.create_labels()
    response = {
        'labels': dataframe_to_dict(data),
        'elementos': dataframe_to_dict(elements)
    }
    return response


@router.get("/inspect-cluster")
def inspect_cluster(variable: str):
    """
    Inspeccionar un cluster
    """
    inspected, centroidesP = cluster.inspect_cluster(variable)
    response = {
        'inspected': dataframe_to_dict(inspected),
        'centroidesP': dataframe_to_dict(centroidesP),

    }
    return response

