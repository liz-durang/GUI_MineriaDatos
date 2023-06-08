import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.cluster import KMeans
from sklearn.metrics import pairwise_distances_argmin_min 


class Cluster:
    def __init__(self) -> None:
        try:
            self.data = pd.read_csv('files/diabetes.csv')
        except:
            print('No se pudo leer el archivo')

        self.final_classification = None
        self.standarizer = StandardScaler()
        self.new_matrix = None
        self.cluster = None

    def get_data(self) -> tuple[pd.DataFrame, pd.Index]:
        columns = self.data.columns
        return (self.data.tail(100), columns)

    def get_variable_analysis(self, variable: str) -> tuple[pd.DataFrame, dict]:
        data_sizes = self.data.groupby(variable).size().to_dict()
        description = self.data.describe().to_dict()

        return data_sizes, description

    def get_correlated_variables(self) -> tuple[pd.DataFrame, np.ndarray]:
        correlation = self.data.corr()
        triangle = np.triu(correlation)

        return correlation, triangle

    def get_variables(self) -> pd.Index:
        return self.data.columns

    def standarize(self) -> pd.DataFrame:
        non_numeric_columns = self.data.select_dtypes(
            exclude=['number']).columns
        self.new_matrix = self.data.drop(non_numeric_columns, axis=1)

        self.standarized_matrix = self.standarizer.fit_transform(
            self.new_matrix
        )

        return pd.DataFrame(self.standarized_matrix, columns=self.new_matrix.columns)