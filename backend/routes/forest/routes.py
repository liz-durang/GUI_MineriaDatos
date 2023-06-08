from fastapi import APIRouter

from data.forest import Forest
from utils.helpers import dataframe_to_dict

router = APIRouter()
forest = Forest()


@router.get('/')
def get_data():
    data, columns = forest.get_data()
    response = {
        'data': dataframe_to_dict(data),
        'columns': columns.to_list()
    }

    return response


@router.get('/variables')
def get_variables():
    variables = forest.get_variables()
    response = {
        'variables': variables.to_list()
    }

    return response


@router.get('/analysis')
def get_analysis(variable: str):
    """
    Analiza y agrupa una variable del archivo.
    """
    data_sizes, description = forest.get_variable_analysis(variable)
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
    correlation, triangle = forest.get_correlated_variables()
    response = {
        'correlation': dataframe_to_dict(correlation),
        'triangle': triangle.tolist()
    }

    return response


@router.get('/decision-forest')
def get_decision_forest(variable: str):
    """
    Crea un árbol de decisión para una variable.
    """
    tree, matrix = forest.get_decision_forest(variable)
    classification, mod_values, accuracy = tree
    response = {
        'classification': classification.tolist(),
        'mod_values': dataframe_to_dict(mod_values),
        'accuracy': accuracy,
        'matrix': dataframe_to_dict(matrix)
    }

    return response


@router.get('/classification-report')
def get_classification_report(variable: str):
    report, importance = forest.get_classification_report(variable)
    response = {
        'report': report,
        'importance': importance
    }

    return response
