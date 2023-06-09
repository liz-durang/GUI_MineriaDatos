import React from "react";

import particional from '../../assets/particional.png';
import {GrCluster} from "react-icons/gr"
import '../stylePages.css'
import { ClusterPaso0 } from "./Components/ClusterPaso0";

function ClusterPage() {
  return (
    <div className="page p-4">
      
      <main className="contenido">

        <h2 className="display-4 mb-4"><GrCluster/> Clustering Particional y Clasificación </h2>
        
        <hr></hr>
        <br></br>
        <p>El algoritmo particional, conocido también como de particiones, organiza los elementos dentro 
        de k clústeres. Tiene ventajas en aplicaciones que involucran gran cantidad de datos.</p>
        
        <div className="imgPages">
          <img src={particional} className="img-fluid" alt="cluster particional"/>
        </div>

        <br></br>
  
          <ClusterPaso0/>

      </main>

      <div className="indice">
        <ul>
          <li className="indice-item"><b>Clustering Particional y Clasificación</b></li>
          <br></br>
           <li className="indice-item"> Paso 0: Importar datos</li>
          <br></br>
           <li className="indice-item">Paso 1:  Descripción de los datos</li>
          <br></br>
           <li className="indice-item">Paso 2: Creación de modelos</li>
           <br></br>
            <ul>
              <li className="indice-item" >Modelo 1: Segmentación particional. Algoritmo: K-means</li>
              <br></br>
              <li className="indice-item" >Modelo 2: Clasificación múltiple. Algoritmo: Bosques aleatorios</li>
            </ul>
        </ul>
      </div>

      
    </div>
  );
}

export { ClusterPage }
