import React from "react";
import { ArbolesPaso0 } from "./Components/ArbolesPaso0";
import {VscListTree} from "react-icons/vsc";  
import arboles from '../../assets/arboles.png';

function ArbolesPage() {
  return (
    <div className="page p-4">
      
      <main className="contenido">
      
        <h2 className="display-4 mb-4"><VscListTree/> Árboles de Decisión Clasificación</h2>
        
        <hr></hr>
        <br></br>
        <p>Es uno de los algoritmos más utilizados en el aprendizaje automático supervisado. <br></br>
          Permiten resolver problemas de regresión (pronóstico) y clasificación y admiten valores numéricos y nominales.
        </p>
        <p>Su objetivo es construir una estructura jerárquica eficiente y escalable que divide los datos en función de determinadas condiciones. 
            Para esto se utiliza la estrategia: divide y vencerás.
        </p>

        <br></br>

        <div className="imgPages mb-4 mt-2">
          <img src={arboles} className="img-fluid" alt="árboles de decisión"/>
        </div>

        <br></br>
        
      
        <ArbolesPaso0/>

      </main>

      <div className="indice">
        <ul>
           <li className="indice-item"><b>Árboles de Decisión Clasificación</b></li>
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

export { ArbolesPage }
