import numpy as np
import pandas as pd


class EDA:
    def __init__(self):
        try:
            self.data = pd.read_csv('files/vaccinations.csv')
        except:
            print('No se pudo leer el archivo')

    def get_data(self) -> tuple[pd.DataFrame, int, int]:
        rows, columns = self.data.shape
        return (self.data, rows, columns)

    def get_null_variables(self) -> dict[str, int]:
        null_variables = self.data.columns[self.data.isnull().any()]

        return {
            variable: int(self.data[variable].isnull().sum())
            for variable in null_variables
        }

    def get_available_variables(self) -> pd.Index:
        return self.data.columns

    def get_variable_analysis(self, variable: str, param: str) -> tuple[pd.DataFrame, pd.DataFrame]:
        variable = self.data[self.data[variable] == param]
        description = variable.describe()

        return variable, description

    def get_statistics(self, variable: str) -> pd.DataFrame:
        return self.data[variable].describe()

    def get_correlation(self, variable: str, param: str) -> pd.DataFrame:
        return self.data[self.data[variable] == param].corr()

    def get_upper_triangle(self, variable: str, param: str) -> np.ndarray:
        return np.triu(self.get_correlation(variable, param))
