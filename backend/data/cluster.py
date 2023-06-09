import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.cluster import KMeans
from sklearn.metrics import pairwise_distances_argmin_min 
from kneed import KneeLocator


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
        self.numberClusters = None
        self.SSE = None
        self.MParticional = None
        self.elements = None
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

    def __standarize(self):
        non_numeric_columns = self.data.select_dtypes(
            exclude=['number']).columns
        self.new_matrix = self.data.drop(non_numeric_columns, axis=1)

        self.standarized_matrix = self.standarizer.fit_transform(
            self.new_matrix
        )
    
    def get_standarize(self) -> pd.DataFrame:
        
        if self.new_matrix is None:
            self.__standarize()

        return pd.DataFrame(self.standarized_matrix, columns=self.new_matrix.columns)
    
    def get_elbow_method(self):
        #Si no está estandarizada, hazlo
        SSE = []
        index = []

        if self.new_matrix is None:
            self.__standarize()

            
        for i in range(2, 10):
            km = KMeans(n_clusters=i, random_state=0)
            km.fit(self.standarized_matrix)
            SSE.append(km.inertia_)
            index.append(i)

        self.SSE = SSE
        
        return index, SSE
    
    def get_number_clusters(self):

        if self.SSE is None: 
            self.get_elbow_method()

        kl = KneeLocator(range(2, 10), self.SSE, curve="convex", direction="decreasing")
        self.numberClusters = kl.elbow.tolist()

    def create_labels(self):
        if self.numberClusters is None: 
            self.get_number_clusters()

        MParticional = KMeans(self.numberClusters, random_state=0).fit(self.standarized_matrix)
        MParticional.predict(self.standarized_matrix)
        labels = (MParticional.labels_).tolist()

        self.data['clusterP'] = labels

        #agrupar elementos en clusters
        self.elements = self.data.groupby(['clusterP'])['clusterP'].count()

        return self.data, self.elements
    
    def inspect_cluster(self, variable: str):
        
        if 'clusterP' not in self.data.columns.to_list(): 
            self.create_labels()

        inspect = self.data[self.data.clusterP == int(variable)]
        centroidesP = self.data.groupby('clusterP').mean()
        
        return inspect, centroidesP
        
   
