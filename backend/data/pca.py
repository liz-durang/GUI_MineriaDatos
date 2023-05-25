from typing import Literal
import pandas as pd
import numpy as np
from sklearn.decomposition import PCA as sklearnPCA
from sklearn.preprocessing import StandardScaler, MinMaxScaler


class PCA:
    def __init__(self):
        try:
            self.data = pd.read_csv('files/diabetes.csv')
        except:
            print('No se pudo leer el archivo')

        self.standarizer = StandardScaler()
        self.new_matrix = None
        self.pca = None

    def get_data(self) -> pd.DataFrame:
        return self.data.tail(100)

    def read_csv(self, file) -> pd.DataFrame:
        self.data = pd.read_csv(file)
        return self.data

    def get_correlation(self) -> tuple[pd.DataFrame, np.ndarray]:
        correlated_data = self.data.corr()
        info_matrix = np.triu(correlated_data)
        return (correlated_data, info_matrix)

    def standarize(self) -> pd.DataFrame:
        non_numeric_columns = self.data.select_dtypes(
            exclude=['number']).columns
        self.new_matrix = self.data.drop(non_numeric_columns, axis=1)

        self.standarized_matrix = self.standarizer.fit_transform(
            self.new_matrix
        )

        return pd.DataFrame(self.standarized_matrix, columns=self.new_matrix.columns)

    def get_pca(self, components: int) -> np.ndarray:
        self.pca = sklearnPCA(n_components=components)
        self.pca.fit(self.standarize())
        return self.pca.components_

    def get_variance(self) -> tuple[np.ndarray, int, float]:
        variance = self.pca.explained_variance_ratio_

        sum_variance = 0
        component = 0

        while sum_variance < 0.8 or sum_variance > 0.90:
            sum_variance = sum(variance[:component])
            component += 1

        return (variance, component, sum_variance)

    def get_cumulative_variance(self) -> np.ndarray:
        return self.pca.explained_variance_ratio_.cumsum()

    def get_relevance_proportion(self, charge: float) -> tuple[pd.DataFrame, pd.DataFrame]:
        if self.new_matrix is None:
            self.standarize()
        if self.pca is None:
            self.get_pca(8)

        columns = self.new_matrix.columns
        charges = pd.DataFrame(
            abs(self.pca.components_),
            columns=columns
        )

        for col in charges.columns:
            if (charges[col] > charge).any():
                del charges[col]

        data_columns = set(self.data.columns)
        charges_columns = set(charges.columns)

        columns_to_delete = data_columns.difference(charges_columns)
        acp_data = self.data.drop(columns_to_delete, axis=1)

        return (charges, acp_data)

    def get_variables(self) -> pd.DataFrame:
        return self.data.columns
