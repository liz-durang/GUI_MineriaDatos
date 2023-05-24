from fastapi import APIRouter

from data.eda import EDA
from utils.helpers import dataframe_to_dict

router = APIRouter()
eda = EDA()

@router.get("/")
def read_data():
    """
    Regresa los datos leídos del archivo csv.
    """
    data, rows, columns = eda.get_data()
    response = {
        "data": dataframe_to_dict(data),
        "rows": rows,
        "columns": columns,
    }

    return response

@router.get("/null_var")
def get_null_variables():
    """
    Regresa el número de valores nulos por variable.
    """
    null_variables = eda.get_null_variables()
    response = {
        'null_variables': null_variables
    }

    return response

@router.get("/available_var")
def get_available_variables():
    """
    Regresa las variables disponibles.
    """
    available_variables = eda.get_available_variables()
    response = {
        'available_variables': available_variables.to_list()
    }

    return response

@router.get("/var_description")
def get_variable_description(variable: str, param: str):
    """
    Regresa la descripción de una variable.
    """
    variable, description = eda.get_variable_analysis(variable, param)
    response = {
        'variable': dataframe_to_dict(variable),
        'description': dataframe_to_dict(description)
    }

    return response

@router.get("/statistics")
def get_statistics(variable: str):
    """
    Regresa las medidas de tendencia central y dispersión de una variable.
    """
    statistics = eda.get_statistics(variable)
    response = {
        'statistics': dataframe_to_dict(statistics)
    }

    return response

@router.get("/correlation")
def get_correlation(variable: str, param: str):
    """
    Regresa la matriz de correlación de una variable.
    """
    correlation = eda.get_correlation(variable, param)
    response = {
        'correlation': dataframe_to_dict(correlation)
    }

    return response

@router.get("/upper_triangle")
def get_upper_triangle(variable: str, param: str):
    """
    Regresa la matriz de correlación de una variable.
    """
    upper_triangle = eda.get_upper_triangle(variable, param)
    response = {
        'upper_triangle': upper_triangle.tolist()
    }

    return response