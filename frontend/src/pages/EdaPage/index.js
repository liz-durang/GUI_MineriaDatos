import React from "react";

import eda from '../../assets/eda.png';
import { EdaPasoInit } from "./Components/EdaPasoInit";
import {MdTravelExplore } from "react-icons/md"
import '../stylePages.css'

function EdaPage() {
  return (
    <div className="page p-4">
      
      <main className="contenido">

        <h2 className="display-4 mb-4"><MdTravelExplore/> Análisis Exploratorio de Datos</h2>
        
        <hr></hr>
        <br></br>
        <p>Una buena práctica, antes de mirar los datos, es hacer un análisis de éstos para resumir sus principales características, a menudo con métodos visuales.</p>
        <p>Su objetivo es tener una idea de la estructura del conjunto de datos, identificar la variable objetivo y posibles técnicas de modelado.</p>
        
        <div className="imgPages">
          <img src={eda} className="img-fluid" alt="analisis exploratorio de datos"/>
        </div>

        <br></br><br></br>
        <EdaPasoInit/>
      
        
      </main>

      <div className="indice">
        <ul>
          <li className="indice-item"><b>Análisis Exploratorio de Datos</b></li>
          <br></br>
           <li className="indice-item"> Paso 0: Importar datos</li>
          <br></br>
           <li className="indice-item">Paso 1: Descripción de la estructura de los datos</li>
          <br></br>
           <li className="indice-item">Paso 2: Identificación de datos faltantes</li>
          <br></br>
           <li className="indice-item">Paso 3: Detección de valores atípicos</li>
          <br></br>
           <li className="indice-item">Paso 4: Identificación de relaciones entre pares variables</li>
        </ul>
      </div>

      
    </div>
  );
}

export { EdaPage }
