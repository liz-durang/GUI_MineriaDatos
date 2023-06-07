import React from "react";

import {PcaPasoInit} from "./Components/PcaPasoInit"
import { PcaPaso0 } from "./Components/PcaPaso0";
import { PcaPaso1 } from "./Components/PcaPaso1";
import { PcaPaso2 } from "./Components/PcaPaso2";
import { PcaPaso3y4 } from "./Components/PcaPaso3y4";
import { PcaPaso6} from "./Components/PcaPaso6";
import {CgComponents} from "react-icons/cg"

function PcaPage() {

  return (
    <div className="page p-4">
      
      <main className="contenido">
      
        <h2 className="display-4 mb-4"><CgComponents/> Análisis de Componentes Principales</h2>
        
        <hr></hr>
        <br></br>
        <p>El análisis de componentes principales (ACP o PCA, Principal Component Analysis) es un algoritmo para reducir la cantidad de variables de conjuntos de datos, mientras se conserva la mayor cantidad de información posible.</p>

        <br></br><br></br>
        <PcaPasoInit/>

        

        

      </main>

      <div className="indice">
        <ul>
           <li className="indice-item"><b>Análisis de Componentes Principales</b></li>
          <br></br>
           <li className="indice-item"> Paso 0: Importar datos</li>
          <br></br>
           <li className="indice-item">Paso 1: Hay evidencia de variables posiblemente correlacionadas</li>
            <br></br>
            <ul>
               <li className="indice-item">Mapa de calor de correlaciones</li>
            </ul>
          <br></br>
           <li className="indice-item">Paso 2: Se hace una estandarización de los datos</li>
          <br></br>
           <li className="indice-item">Pasos 3 y 4: Se calcula la matriz de covarianzas</li>
          <br></br>
           <li className="indice-item">Paso 5: Se decide el número de componentes principales</li>
          <br></br>
           <li className="indice-item">Paso 6: Se examina la proporción de relevancias –cargas–</li>
          <br></br>
           <li className="indice-item">Paso 7. Se eliminan las variables necesarias de acuerdo a PCA</li>
        </ul>
      </div>

    </div>
  );
}

export { PcaPage }
