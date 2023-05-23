import json
import pandas as pd


def dataframe_to_dict(df: pd.DataFrame) -> dict[str, str]:
    """
    Convierte un dataframe a diccionario.
    """
    return json.loads(df.to_json(orient='records'))
