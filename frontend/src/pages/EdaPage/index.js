import React from "react";

import eda from '../../assets/eda.png';
import { EdaPaso0 } from "./Components/EdaPaso0";
import { EdaPaso1 } from "./Components/EdaPaso1";
import { EdaPaso2 } from "./Components/EdaPaso2";

import { EdaPaso4 } from "./Components/EdaPaso4";

function EdaPage() {
  return (
    <div className="page p-4">
      
      <main>
      
        <h2 className="display-4 mb-4">Análisis Exploratorio de Datos</h2>
        
        <hr></hr>
        <br></br>
        <p>Una buena práctica, antes de mirar los datos, es hacer un análisis de éstos para resumir sus principales características, a menudo con métodos visuales.</p>
        <p>Su objetivo es tener una idea de la estructura del conjunto de datos, identificar la variable objetivo y posibles técnicas de modelado.</p>
        
        <div className="imgPages">
          <img src={eda} className="img-fluid" alt="analisis exploratorio de datos"/>
        </div>

        <EdaPaso0/>
        <br></br><br></br>
        <EdaPaso1/> 
        <br></br><br></br>
        <EdaPaso2/> 
        <br></br><br></br>
        <EdaPaso4/> 
      </main>

    </div>
  );
}

export { EdaPage }
