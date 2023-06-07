from fastapi import APIRouter

from data.trees import Trees
from utils.helpers import dataframe_to_dict

router = APIRouter()
trees = Trees()


@router.get('/')
def get_data():
    data, columns = trees.get_data()
    response = {
        'data': dataframe_to_dict(data),
        'columns': columns.to_list()
    }

    return response


@router.get('/variables')
def get_variables():
    variables = trees.get_variables()
    response = {
        'variables': variables.to_list()
    }

    return response


@router.get('/analysis')
def get_analysis(variable: str):
    """
    Analiza y agrupa una variable del archivo.
    """
    data_sizes, description = trees.get_variable_analysis(variable)
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
    correlation, triangle = trees.get_correlated_variables()
    response = {
        'correlation': dataframe_to_dict(correlation),
        'triangle': triangle.tolist()
    }

    return response


@router.get('/decision-tree')
def get_decision_tree(variable: str):
    """
    Crea un árbol de decisión para una variable.
    """
    tree, matrix = trees.get_decision_tree(variable)
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
    report, importance = trees.get_classification_report(variable)
    response = {
        'report': report,
        'importance': importance
    }

    return response
