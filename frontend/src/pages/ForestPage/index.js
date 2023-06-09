import React from "react";

import {MdOutlineForest} from "react-icons/md";  
import { BosquesPaso0 } from "./Components/BosquesPaso0";
import forest from '../../assets/bosques.png';

function ForestPage() {
  return (
    <div className="page p-4">
      
      <main className="contenido">
      
        <h2 className="display-4 mb-4"><MdOutlineForest/> Bosques Aleatorios Clasificación</h2>
        
        <hr></hr>
        <br></br>
        <p>Los bosques aleatorios son una variación moderna, que agrupan varios árboles de decisión para producir 
            un modelo generalizado con el objetivo de reducir la tendencia al sobreajuste.</p>
        <p>Es uno de los algoritmos de aprendizaje automático más usados en la actualidad</p>

        <div className="imgPages mb-4 mt-2">
          <img src={forest} className="img-fluid" alt="bosques aleatorios"/>
        </div>
      
      <BosquesPaso0/>

      </main>

      <div className="indice">
        <ul>
           <li className="indice-item"><b>Bosques Aleatorios Clasificación</b></li>
          <br></br>
           <li className="indice-item"> Paso 0: Importar datos</li>
          <br></br>
           <li className="indice-item">Paso 1: Descripción de los datos</li>
          <br></br>
           <li className="indice-item">Paso 2: Selección de características</li>
          <br></br>
           <li className="indice-item">Paso 3: Definición de las variables predictoras y variable clase</li>
          <br></br>
           <li className="indice-item">Paso 4: Creación del modelo</li>
          <br></br>
           <li className="indice-item">Paso 5: Reporte de clasificación</li>
           <br></br>
           <li className="indice-item">Paso 6: Validar con la curva ROC</li>
        </ul>
      </div>
      
    </div>
  );
}

export { ForestPage }
