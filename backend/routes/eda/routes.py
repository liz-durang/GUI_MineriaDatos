from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from typing import List
import os

from data.eda import EDA
from utils.helpers import dataframe_to_dict

router = APIRouter()

eda = None
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
            eda = EDA(fileName)
            
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
    eda = EDA(fileName)
    
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
    global fileName
    eda = EDA(fileName)

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
    global fileName
    eda = EDA(fileName)

    available_variables = eda.get_available_variables()
    response = {
        'available_variables': available_variables.to_list()
    }

    return response

@router.get("/var_description")
def get_variable_description(variable: str, param: str):
    """
    Regresa la descripción de una variable y su resumen estadístico.
    """

    global fileName
    eda = EDA(fileName)

    variables, description = eda.get_variable_analysis(variable, param)
    response = {
        'variable': dataframe_to_dict(variables),
        'description': description
    }

    return response

@router.get("/statistics")
def get_statistics(variable: str, param: str):
    """
    Regresa la distribución de variables categóricas
    """
    global fileName
    eda = EDA(fileName)

    statistics = eda.get_statistics(variable, param)
    response = {
        'statistics': statistics
    }

    return response

@router.get("/correlation")
def get_correlation(variable: str, param: str):
    """
    Regresa la matriz de correlación de una variable.
    """
    global fileName
    eda = EDA(fileName)

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
    global fileName
    eda = EDA(fileName)

    upper_triangle = eda.get_upper_triangle(variable, param)
    response = {
        'upper_triangle': upper_triangle.tolist()
    }

    return response