
import React from "react";
import { Chart } from "react-google-charts";

import '../index.css';

function PcaPaso6({pca_components}) {

  //Datos para gráfico
  let data = pca_components;

  console.log(data)

  

  function formatData() {

      
    }

  

  formatData();

  return (
    <>
        <h3>Paso 6: Se examina la proporción de relevancias –cargas–</h3>
        <br></br>

        <p>Se revisan los valores absolutos de los componentes principales seleccionados. </p>
        <p>Cuanto mayor sea el valor absoluto, más importante es esa variable en el componente principal.</p>
        <br></br>
 
        
    </>
  );
}

export { PcaPaso6 };