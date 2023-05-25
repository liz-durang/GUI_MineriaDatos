
import React from "react";
import { Chart } from "react-google-charts";

import '../index.css';

function PcaPaso5({nComponent, cum_variance, displayTable}) {

  //Datos para gráfico
  let dataChart = cum_variance;

  console.log(nComponent)

  console.log(cum_variance)

  function formatData() {

    //Convertir a arreglo de arreglos
    dataChart = cum_variance.map(item => [item]);
    

    //Agregarle un valor id al inicio de cada arreglo. 
    let lengthData = dataChart.length;
    let aux1 = 0;
    
    while (aux1 < lengthData) {
      dataChart[aux1].unshift(aux1)
      aux1 = aux1 + 1;
      
    }

    //Agregar header a los datos
    dataChart.unshift(["Número de componentes", "cum_variance"])

    console.log(dataChart);
  }

  formatData();

  return (
    <>
        <h3>Paso 5: Se decide el número de componentes principales</h3>
        <br></br>

        <p>Se calcula el porcentaje de relevancia, es decir, entre el 75 y 90% de varianza total.</p>
        <p>Se identifica mediante una gráfica el grupo de componentes con mayor varianza.</p>
        <br></br>

        {displayTable && (<Chart
          chartType="Line"
          height="400px"
          data={dataChart}
          className="esquema"
        />     
        )}   

        {!displayTable && ( 
        <>
          <div class="spinner-border text-secondary mb-2" role="status">
              <span class="visually-hidden">Loading...</span>
          </div>
          <p className="text-black-50 font-monospace"> En espera de que selecciones el número de componentes</p>
        </>
           )}
        
    </>
  );
}

export { PcaPaso5 };