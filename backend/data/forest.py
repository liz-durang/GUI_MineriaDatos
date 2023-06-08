import pandas as pd
import numpy as np
from sklearn import model_selection
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import label_binarize
from sklearn.metrics import RocCurveDisplay
from sklearn import metrics

class Forest:
    def __init__(self) -> None:
        try:
            self.data = pd.read_csv('files/diabetes.csv')
        except:
            print('No se pudo leer el archivo')

        self.final_classification = None

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

    def __create_desicion_forest(self, variable: str) -> tuple[np.ndarray, pd.DataFrame, float]:
        self.__create_models(variable)
        self.__classify()

        mod_values = pd.DataFrame(self.y_test, self.final_classification)

        accuracy = float(accuracy_score(
            self.y_test, self.final_classification))

        return self.final_classification, mod_values, accuracy

    def __get_classification_matrix(self, variable: str) -> pd.DataFrame:
        classification_matrix = pd.crosstab(
            self.y_test.ravel(),
            self.final_classification,
            rownames=['Reales'],
            colnames=['Clasificacion']
        )

        return classification_matrix

    def get_decision_forest(self, variable: str) -> tuple:
        forest = self.__create_desicion_forest(variable)
        matrix = self.__get_classification_matrix(variable)

        return forest, matrix

    def get_classification_report(self, variable: str) -> tuple[dict, pd.DataFrame]:
        if self.final_classification is None:
            self.__create_models(variable)
            self.__classify()

        
        report = {
            'Criterio': self.ad_forest.criterion,
            'Exactitud': accuracy_score(self.y_test, self.final_classification),
            'ReporteClasificacion': self.get_report_text(self.final_classification)
        }
        importance = pd.DataFrame({
            'Variable': list(self.predictors),
            'Importancia': self.ad_forest.feature_importances_
        }).sort_values('Importancia', ascending=False)

        return report, importance

    def get_report_text(self, variable: str):
        if self.final_classification is None:
            self.__create_models(variable)
            self.__classify()
        return classification_report(
            self.y_test,
            self.final_classification,
            output_dict=True

        )

    def __classify(self):
        self.ad_forest = RandomForestClassifier(random_state=0)
        self.ad_forest.fit(self.x_train, self.y_train)

        self.final_classification = self.ad_forest.predict(self.x_test)

    def __get_predictors_variables(self, variable: str) -> None:
        variables = list(self.data.columns)
        variables.remove(variable)

        self.y = np.array(self.data[[variable]])
        self.predictors = self.data[variables]

    def __create_models(self, variable: str):
        self.__get_predictors_variables(variable)
        self.x_train, self.x_test, self.y_train, self.y_test = model_selection.train_test_split(
            self.predictors,
            self.y, test_size=0.2,
            random_state=0
        )
