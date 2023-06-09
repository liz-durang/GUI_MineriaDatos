import React from "react";
import { instance } from "../../../Axios";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";


function ClusterPaso22({displayModel}) {

    const [sse, setsse] = useState([]);
    const [kValues, setKvalue] = useState([]);
    let dataChart = [];

    useEffect(() => {
        instance.get('cluster/get-elbow-method')
        .then(function (response) {
          // manejar respuesta exitosa
          setsse(response.data.index);
          setKvalue(response.data.k);
        })
        .catch(function (error) {
          // manejar error
          console.log(error);
        })
        .finally(function () {
          // siempre sera executado
        });
        
      }, [])


    //Dar formato a los datos del método del codo
    function  formatDescription () {

      let aux = [["Cantidad de K Clusters", "SSE"]];

      sse?.map((element, index) => 
        aux.push([element, kValues[index]])
      );

      dataChart = aux;
    }

    formatDescription(); 

    return(
        <>
          {displayModel && (

            <>
            <br></br><br></br>
            <h5>2) Definición de k clusters para K-means</h5>
            <p> Se usa el método del codo para definir k clusters</p>
            <br></br>
            
            {/* Gráfica método del codo*/}

            <div className="table-responsive" style={{width: "100%"}}>
              <Chart
                chartType="Line"
                height="400px"
                data={dataChart}
              />  
            </div>

            </>

          )}
            
                
        </>

    );

}

export {ClusterPaso22};